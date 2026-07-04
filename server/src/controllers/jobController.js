import { Op } from "sequelize";
import Job from "../models/Job.js";
import Company from "../models/Company.js";
import CategoryJob from "../models/CategoryJob.js";

const normalizeArray = (value) => {
  if (Array.isArray(value)) return value;
  if (value === undefined || value === null || value === "") return [];
  return [value];
};

const normalizeWorkTime = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value === "object" && value !== null) return value;
  if (value === undefined || value === null || value === "") return [];
  return [value];
};

// GET /api/jobs
// Xem danh sách bài đăng tuyển dụng
export const getAllJobs = async (req, res) => {
  try {
    const { keyword, location, categoryId, companyId, minSalary, maxSalary } = req.query;
    const where = {};

    if (keyword) {
      where.title = { [Op.iLike]: `%${keyword}%` };
    }

    if (location) {
      where.location = { [Op.iLike]: `%${location}%` };
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (companyId) {
      where.companyId = companyId;
    }

    if (minSalary || maxSalary) {
      where.salaryMax = {};
      if (minSalary) where.salaryMax[Op.gte] = Number(minSalary);
      if (maxSalary) where.salaryMin = { [Op.lte]: Number(maxSalary) };
    }

    const jobs = await Job.findAll({
      where,
      include: [
        {
          model: Company,
          as: "createBy",
          attributes: ["id", "companyName", "address", "status", "companySize"]
        },
        {
          model: CategoryJob,
          as: "category",
          attributes: ["id", "title", "iconUrl"]
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
    const { id } = req.params;

    const job = await Job.findByPk(id, {
      include: [
        {
          model: Company,
          as: "createBy",
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
      workTime
    } = req.body;

    if (!companyId || !categoryId || !title || salaryMin === undefined || salaryMax === undefined || !location) {
      return res.status(400).json({
        message: "Vui lòng nhập đầy đủ thông tin bắt buộc: companyId, categoryId, title, salaryMin, salaryMax, location"
      });
    }

    const company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(404).json({ message: "Không tìm thấy công ty" });
    }

    const category = await CategoryJob.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Không tìm thấy danh mục việc làm" });
    }

    const job = await Job.create({
      companyId,
      categoryId,
      title,
      jobRequirement: normalizeArray(jobRequirement),
      description: normalizeArray(description),
      candidateRequirement: normalizeArray(candidateRequirement),
      benefit: normalizeArray(benefit),
      salaryMin: Number(salaryMin),
      salaryMax: Number(salaryMax),
      location,
      workTime: normalizeWorkTime(workTime)
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
    const { id } = req.params;

    const job = await Job.findByPk(id);
    if (!job) {
      return res.status(404).json({ message: "Không tìm thấy bài đăng cần sửa" });
    }

    const allowedFields = [
      "companyId",
      "categoryId",
      "title",
      "salaryMin",
      "salaryMax",
      "location"
    ];

    const updateData = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) updateData[field] = req.body[field];
    }

    if (req.body.jobRequirement !== undefined) updateData.jobRequirement = normalizeArray(req.body.jobRequirement);
    if (req.body.description !== undefined) updateData.description = normalizeArray(req.body.description);
    if (req.body.candidateRequirement !== undefined) updateData.candidateRequirement = normalizeArray(req.body.candidateRequirement);
    if (req.body.benefit !== undefined) updateData.benefit = normalizeArray(req.body.benefit);
    if (req.body.workTime !== undefined) updateData.workTime = normalizeWorkTime(req.body.workTime);
    if (req.body.salaryMin !== undefined) updateData.salaryMin = Number(req.body.salaryMin);
    if (req.body.salaryMax !== undefined) updateData.salaryMax = Number(req.body.salaryMax);

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
    const { id } = req.params;

    const job = await Job.findByPk(id);
    if (!job) {
      return res.status(404).json({ message: "Không tìm thấy bài đăng cần xóa" });
    }

    await job.destroy();

    return res.status(200).json({
      message: "Xóa bài đăng thành công"
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi khi xóa bài đăng",
      error: error.message
    });
  }
};
