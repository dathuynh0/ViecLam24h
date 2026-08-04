import { Op, where } from 'sequelize'
import sequelize from '../config/db.js'
import Job from '../models/Job.js'
import Company from '../models/Company.js'
import Candidate from '../models/Candidate.js'
import JobApplication from '../models/JobApplication.js'
import CategoryJob from '../models/CategoryJob.js'
import User from '../models/User.js'


const calcTrend = (current, previous) => {
  if (previous === 0) return current > 0 ? 100 : 0
  return Number((((current - previous) / previous) * 100).toFixed(1))
}


const getDashboardStats = async (req, res) => {
  try {
    const now = new Date()
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)

    // --- Tổng số + số liệu tháng này/tháng trước để tính trend ---
    const [
      totalJobs, jobsThisMonth,
      totalCompanies, companiesThisMonth,
      totalCandidates, candidatesThisMonth,
      totalApplications, applicationsThisMonth,
    ] = await Promise.all([
      Job.count({ where: {
        status: 'active',
        expiredAt: {
          [Op.gt]: new Date()
        }
      } }),
    
      Company.count({
        where: {
          status: 'active'
        }
      }),
  
      User.count({ where: { role: 'candidate' } }),

      JobApplication.count(),
    ])

    // --- Tin tuyển dụng theo ngày (30 ngày gần nhất) ---
    const jobsOverTimeRaw = await Job.findAll({
      attributes: [
        [sequelize.fn('DATE', sequelize.col('createdAt')), 'date'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
      ],
      where: {
        createdAt: { [Op.gte]: new Date(now - 30 * 24 * 60 * 60 * 1000) },
      },
      group: [sequelize.fn('DATE', sequelize.col('createdAt'))],
      order: [[sequelize.fn('DATE', sequelize.col('createdAt')), 'ASC']],
      raw: true,
    })

    // --- Top 5 ngành nghề có nhiều tin nhất ---
    const topCategories = await CategoryJob.findAll({
      attributes: [
        'id',
        'title',
        [sequelize.fn('COUNT', sequelize.col('job.id')), 'jobCount'],
      ],
      include: [{ model: Job, as: 'job', attributes: [] }],
      group: ['CategoryJob.id'],
      order: [[sequelize.literal('"jobCount"'), 'DESC']],
      limit: 5,
      subQuery: false,
      raw: true,
    })

    // --- Công ty chờ duyệt gần đây ---
    const pendingCompanies = await Company.findAll({
      where: { status: 'pending' },
      attributes: ['id', 'companyName', 'status', 'createdAt'],
      order: [['createdAt', 'DESC']],
      limit: 5,
    })

    return res.status(200).json({
      totalJobs,
      totalCompanies,
      totalCandidates,
      totalApplications,
      jobsOverTime: jobsOverTimeRaw.map(r => ({
        date: r.date,
        count: Number(r.count),
      })),
      topCategories: topCategories.map(c => ({
        title: c.title,
        jobCount: Number(c.jobCount),
      })),
      pendingCompanies,
    })
  } catch (error) {
    console.error('Lỗi khi lấy dashboard stats:', error)
    return res.status(500).json({ message: 'Lỗi server khi lấy dữ liệu thống kê' })
  }
}

export {
    getDashboardStats
}