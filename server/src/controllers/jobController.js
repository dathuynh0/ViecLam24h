import { Op, where } from "sequelize";
import Job from "../models/Job.js";
import Company from "../models/Company.js";
import CategoryJob from "../models/CategoryJob.js";

import toSlug from "../utils/slug.js";


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