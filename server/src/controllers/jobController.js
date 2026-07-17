import { Op, where } from "sequelize";
import Job from "../models/Job.js";
import Company from "../models/Company.js";
import CategoryJob from "../models/CategoryJob.js";

import toSlug from "../utils/slug.js";
import { salaryRange } from '../utils/filter.js';


// GET /api/jobs
// Xem danh sách bài đăng tuyển dụng
export const getAllJobs = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = 12;
    const offset = (page - 1) * limit;

    const { count, rows: jobs } = await Job.findAndCountAll({ where: { 
      expiredAt: {
        [Op.gt]: new Date()
      },
      status: 'active'
    },
      include: [
        {
          model: Company,
          as: "createdBy",
          attributes: ["id", "companyName", "address", "status", "companySize"]
        },
        {
          model: CategoryJob,
          as: "category",
          attributes: ['id', 'title', 'slug']
        }
      ],
      order: [["createdAt", "DESC"]]
    });

    return res.status(200).json({
      message: "Lấy danh sách bài đăng thành công",
      data: jobs
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi khi lấy danh sách bài đăng",
      error: error.message
    });
  }
};

// GET /api/jobs/:id
// Xem chi tiết bài đăng
export const getJobById = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findByPk(jobId, { where: { 
      expiredAt: {
        [Op.gt]: new Date()
      },
      status: 'active'
    },
      include: [
        {
          model: Company,
          as: "createdBy",
          attributes: ["id", "companyName", "description", "address", "status", "follow", "taxCode", "companySize"]
        },
        {
          model: CategoryJob,
          as: "category",
          attributes: ["id", "title", "iconUrl"]
        }
      ]
    });

    if (!job) {
      return res.status(404).json({ message: "Không tìm thấy bài đăng" });
    }

    return res.status(200).json({
      message: "Lấy chi tiết bài đăng thành công",
      data: job
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi khi lấy chi tiết bài đăng",
      error: error.message
    });
  }
};

export const getJobBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const job = await Job.findOne({ where: { slug }, include: [ 
      { 
        model: Company, as: 'createdBy'
      },
      {
        model: CategoryJob, as: 'category'
      }
    ] });
    if(!job) {
      return res.status(404).json({ message: 'Không tìm thấy công việc tuyển dụng' });
    }

    return res.status(200).json({ job });
  } catch (error) {
    console.error('Lỗi khi gọi hàm getJobBySlug ', error);
    return res.status(404).json({ message: 'Lỗi server' });
  }
}

export const getJobByCategory = async (req, res) => {
    try {
      const { slug } = req.params;
      const page  = req.query.page || 1;
      const limit = 12;
      const { salary, field, work_type, work_arrangement } = req.query;

      const offset = (page - 1) * limit;

      const where = {};
      const companyWhere = {};
      if(work_type && work_type !== 'all') {
        where.workType = work_type;
      }

      // { value: "all", label: "Tất cả" },
      // { value: "1", label: "Dưới 10 triệu" },
      // { value: "2", label: "10 - 15 triệu" },
      // { value: "3", label: "15 - 20 triệu" },
      // { value: "4", label: "20 - 30 triệu" },
      // { value: "5", label: "Trên 30 triệu" }
      if(salary && salary !== 'all') {
        const range = salaryRange[salary];
        
        if (range) {
          where.salaryMin = { [Op.lte]: range.max };
          where.salaryMax = { [Op.gte]: range.min };
        }
      }

      if(work_arrangement && work_arrangement !== 'all') {
        where.workArrangement = work_arrangement;
      }

      if(field && field !== 'all') {
        companyWhere.field = field;
      }

      const { count, rows: jobs } = await Job.findAndCountAll({
        where,
        attributes: ['id', 'title', 'salaryMin', 'salaryMax', 'location', 'slug', 'createdAt'],
        include: [
          {
            model: CategoryJob,
            as: 'category',
            where: { slug },
          },
          {
            model: Company,
            as: 'createdBy',
            where: companyWhere,
            attributes: ['companyName', 'logoUrl', 'field', 'slug']
          }
        ],
        order: [['createdAt', 'DESC']],
        limit,
        offset,
        distinct: true
      });

      const totalPage = Math.ceil(count / limit);

      return res.status(200).json({ page, totalPage, jobs });
    } catch (error) {
        console.error('Lỗi khi gọi hàm getJobByCategory ', error)
        return res.status(500).json({ message: 'Lỗi sever'})
    }
}

export const searchJob = async (req, res) => {
  try {
    const page  = req.query.page || 1;
    const limit = 12;
    const { name, location, salary, field, work_type, work_arrangement } = req.query;

    const offset = (page - 1) * limit;
    const whereJob = { status: 'active' };

    if (name) {
      whereJob.title = { [Op.iLike]: `%${name}%` };
    }

    if (location && location !== 'Toàn quốc') {
      whereJob.location = { [Op.iLike]: `%${location}%` };
    }

    if(work_type && work_type !== 'all') {
      whereJob.workType = work_type;
    }

    if(work_arrangement && work_arrangement !== 'all') {
      whereJob.workArrangement = work_arrangement;
    }

    if(salary && salary !== 'all') {
      const range = salaryRange[salary];
        
      if (range) {
        whereJob.salaryMin = { [Op.lte]: range.max };
        whereJob.salaryMax = { [Op.gte]: range.min };
      }
    }

    const companyWhere = {};
    if(field && field !== 'all') {
      companyWhere.field = field;
    }

    const { rows, count } = await Job.findAndCountAll({
      where: whereJob,
      include: [
        {
          model: Company,
          as: 'createdBy',
          attributes: ['id', 'companyName', 'logoUrl', 'slug'],
          required: true,
        },
        {
          model: Company,
          as: 'createdBy',
          where: companyWhere,
          attributes: ['companyName', 'logoUrl', 'field', 'slug']
        }
      ],
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({
      message: 'Tìm kiếm việc làm thành công',
      jobs: rows,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      limit,
    });
  } catch (error) {
    console.error('Lỗi khi gọi hàm searchJob ', error);
    return res.status(500).json({ message: 'Lỗi server' });
  }
};

export const getFeaturedJob = async (req, res) => {
  try {
    const featuredJob = await Job.findAll({
      where: {
        status: 'active',
        expiredAt: {
          [Op.gt]: new Date()
        }
      },
      include: [
        { model: Company, as: 'createdBy' }
      ],
      attributes: {
        exclude: ['benefit', 'candidateRequirement', 'description', 'jobRequirement']
      },
      order: [["createdAt", "DESC"]],
      limit: 9
    });

    return res.status(200).json({ featuredJob })
  } catch (error) {
    console.error('Lỗi khi gọi hàm getFeaturedJob: ', error);
    return res.status(500).json({ message: 'Lỗi server' });
  }
}

// POST /api/jobs
// Đăng bài tuyển dụng
export const createJob = async (req, res) => {
  try {
    const company = req.user.company;
    const {
      categoryId,
      title,
      jobRequirement,
      description,
      candidateRequirement,
      benefit,
      salaryMin,
      salaryMax,
      location,
      workTime,
      contractType,
      workArrangement,
      quantity,
      expiredAt
    } = req.body;

    if ( !categoryId || !title || salaryMin === undefined || salaryMax === undefined || !location || !expiredAt) {
      return res.status(400).json({
        message: "Vui lòng nhập đầy đủ thông tin bắt buộc: categoryId, title, salaryMin, salaryMax, location"
      });
    }

    const category = await CategoryJob.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Không tìm thấy danh mục việc làm" });
    }

    const job = await Job.create({
      companyId: company.id,
      categoryId,
      title,
      jobRequirement,
      description,
      candidateRequirement,
      benefit,
      salaryMin: Number(salaryMin),
      salaryMax: Number(salaryMax),
      location,
      workTime,
      contractType,
      workArrangement,
      quantity,
      slug: toSlug(title),
      expiredAt
    });

    return res.status(201).json({
      message: "Đăng bài tuyển dụng thành công",
      data: job
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ message: "Tiêu đề bài đăng đã tồn tại" });
    }

    return res.status(500).json({
      message: "Lỗi khi đăng bài tuyển dụng",
      error: error.message
    });
  }
};

// PUT /api/jobs/:id
// Sửa bài tuyển dụng
export const updateJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ message: "Không tìm thấy bài đăng cần sửa" });
    }

    const allowedFields = [
      "companyId",
      "categoryId",
      "title",
      "salaryMin",
      "salaryMax",
      "location",
      "contractType",
      "workArrangement",
      "quantity",
      "expiredAt"
    ];

    const updateData = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) updateData[field] = req.body[field];
    }

    if (req.body.jobRequirement !== undefined) updateData.jobRequirement = req.body.jobRequirement;
    if (req.body.description !== undefined) updateData.description = req.body.description;
    if (req.body.candidateRequirement !== undefined) updateData.candidateRequirement = req.body.candidateRequirement;
    if (req.body.benefit !== undefined) updateData.benefit = req.body.benefit;
    if (req.body.workTime !== undefined) updateData.workTime = req.body.workTime;
    if (req.body.salaryMin !== undefined) updateData.salaryMin = Number(req.body.salaryMin);
    if (req.body.salaryMax !== undefined) updateData.salaryMax = Number(req.body.salaryMax);
    if (req.body.contractType !== undefined) updateData.contractType = req.body.contractType;
    if (req.body.workArrangement !== undefined) updateData.workArrangement = req.body.workArrangement;
    if (req.body.quantity !== undefined) updateData.quantity = req.body.quantity;
    if (req.body.expiredAt !== undefined) updateData.expiredAt = req.body.expiredAt;

    await job.update(updateData);

    return res.status(200).json({
      message: "Cập nhật bài đăng thành công",
      data: job
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ message: "Tiêu đề bài đăng đã tồn tại" });
    }

    return res.status(500).json({
      message: "Lỗi khi cập nhật bài đăng",
      error: error.message
    });
  }
};

// DELETE /api/jobs/:id
// Xóa bài tuyển dụng
export const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ message: "Không tìm thấy bài đăng cần xóa" });
    }

    await job.destroy();

    return res.status(200).json({
      message: "Xóa bài đăng thành công", job
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi khi xóa bài đăng",
      error: error.message
    });
  }
};

// Admin
export const createJobAdmin = async (req, res) => {
  try {
    const {
      companyId,
      categoryId,
      title,
      jobRequirement,
      description,
      candidateRequirement,
      benefit,
      salaryMin,
      salaryMax,
      location,
      workTime,
      contractType,
      workArrangement,
      quantity,
      expiredAt
    } = req.body;

    if (!companyId || !categoryId || !title || salaryMin === undefined || salaryMax === undefined || !location || !expiredAt) {
      return res.status(400).json({
        message: "Vui lòng nhập đầy đủ thông tin"
      });
    }

    const company = await Company.findByPk(companyId);
    if(!company) {
      return res.status(404).json({ message: 'Không tìm thấy công ty' });
    }

    const category = await CategoryJob.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Không tìm thấy danh mục việc làm" });
    }

    const job = await Job.create({
      companyId,
      categoryId,
      title,
      jobRequirement,
      description,
      candidateRequirement,
      benefit,
      salaryMin: Number(salaryMin),
      salaryMax: Number(salaryMax),
      location,
      workTime,
      contractType,
      workArrangement,
      quantity,
      slug: toSlug(title),
      expiredAt
    });

    return res.status(201).json({
      message: "Đăng bài tuyển dụng thành công",
      data: job
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ message: "Tiêu đề bài đăng đã tồn tại" });
    }

    return res.status(500).json({
      message: "Lỗi khi đăng bài tuyển dụng",
      error: error.message
    });
  }
};

export const activeJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findByPk(jobId);
    if(!job) {
      return res.status(404).json({ message: 'Không tìm thấy bài đăng tuyển dụng '});
    }

    if(job.status !== 'pending') {
      return res.status(400).json({ message: 'Bài đăng đã được duyệt hoặc đã bị từ chối '});
    }

    job.status = 'active';
    await job.save();

    return res.status(200).json({ message: 'Duyệt bài đăng thành công', job });
  } catch (error) {
    console.error('Lỗi khi gọi hàm activeJob ', error);
    return res.status(500).json({ message: 'Lỗi server' });
  }
}

export const rejectJob = async (req, res) => {
  try {
     const { jobId } = req.params;

    const job = await Job.findByPk(jobId);
    if(!job) {
      return res.status(404).json({ message: 'Không tìm thấy bài đăng tuyển dụng '});
    }

    if(job.status !== 'reject') {
      return res.status(400).json({ message: 'Bài đăng đã được duyệt'});
    }

    job.status = 'rejected';
    await job.save();

    return res.status(200).json({ message: 'Từ chối bài đăng thành công ', job });
  } catch (error) {
    console.error('Lỗi khi gọi hàm rejectJob ', error);
    return res.status(500).json({ message: 'Lỗi server' });
  }
}