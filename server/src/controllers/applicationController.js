import JobApplication from "../models/JobApplication.js";
import Candidate from "../models/Candidate.js";
import Job from "../models/Job.js";
import Company from "../models/Company.js";
import User from "../models/User.js";

const statusTextMap = {
  pending: "Đã nộp CV",
  reviewing: "Nhà tuyển dụng đang xem CV",
  interviewing: "Được mời phỏng vấn",
  accepted: "Đã được chấp nhận",
  rejected: "Đã bị từ chối"
};

// POST /api/applications
// Ứng viên nộp CV vào một bài tuyển dụng
export const applyJob = async (req, res) => {
  try {
    const { candidateId, jobId, applyCVUrl } = req.body;

    if (!candidateId || !jobId) {
      return res.status(400).json({
        message: "Vui lòng nhập đầy đủ candidateId và jobId"
      });
    }

    const candidate = await Candidate.findByPk(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: "Không tìm thấy ứng viên" });
    }

    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ message: "Không tìm thấy bài tuyển dụng" });
    }

    const finalCVUrl = applyCVUrl || candidate.cvUrl;
    if (!finalCVUrl) {
      return res.status(400).json({
        message: "Vui lòng cung cấp applyCVUrl hoặc cập nhật CV trong hồ sơ ứng viên"
      });
    }

    const existedApplication = await JobApplication.findOne({
      where: { candidateId, jobId }
    });

    if (existedApplication) {
      return res.status(409).json({
        message: "Ứng viên đã nộp CV cho bài tuyển dụng này rồi",
        data: existedApplication
      });
    }

    const application = await JobApplication.create({
      candidateId,
      jobId,
      applyCVUrl: finalCVUrl,
      status: "pending"
    });

    return res.status(201).json({
      message: "Nộp CV ứng tuyển thành công",
      data: application
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi khi nộp CV ứng tuyển",
      error: error.message
    });
  }
};

// GET /api/applications/candidate/:candidateId
// Xem danh sách CV mà một ứng viên đã nộp
export const getApplicationsByCandidate = async (req, res) => {
  try {
    const { candidateId } = req.params;

    const candidate = await Candidate.findByPk(candidateId);
    if (!candidate) {
      return res.status(404).json({ message: "Không tìm thấy ứng viên" });
    }

    const applications = await JobApplication.findAll({
      where: { candidateId },
      include: [
        {
          model: Job,
          as: "job",
          attributes: ["id", "title", "salaryMin", "salaryMax", "location", "workTime"],
          include: [
            {
              model: Company,
              as: "createBy",
              attributes: ["id", "companyName", "address", "status", "companySize"]
            }
          ]
        }
      ],
      order: [["createdAt", "DESC"]]
    });

    return res.status(200).json({
      message: "Lấy danh sách CV đã nộp thành công",
      data: applications
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi khi lấy danh sách CV đã nộp",
      error: error.message
    });
  }
};

// GET /api/applications/job/:jobId
// Nhà tuyển dụng xem danh sách CV đã nộp vào một bài tuyển dụng
export const getApplicationsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ message: "Không tìm thấy bài tuyển dụng" });
    }

    const applications = await JobApplication.findAll({
      where: { jobId },
      include: [
        {
          model: Candidate,
          as: "candidate",
          attributes: ["id", "fullName", "avatarUrl", "cvUrl", "skill", "phone"],
          include: [
            {
              model: User,
              as: "user",
              attributes: ["id", "username", "email", "role", "status"]
            }
          ]
        }
      ],
      order: [["createdAt", "DESC"]]
    });

    return res.status(200).json({
      message: "Lấy danh sách ứng viên đã nộp CV thành công",
      data: applications
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi khi lấy danh sách ứng viên đã nộp CV",
      error: error.message
    });
  }
};

// GET /api/applications/:id/status
// Xem trạng thái CV đã nộp
export const getApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await JobApplication.findByPk(id, {
      attributes: ["id", "candidateId", "jobId", "applyCVUrl", "status", "createdAt", "updatedAt"]
    });

    if (!application) {
      return res.status(404).json({ message: "Không tìm thấy hồ sơ ứng tuyển" });
    }

    return res.status(200).json({
      message: "Lấy trạng thái CV đã nộp thành công",
      data: {
        ...application.toJSON(),
        statusText: statusTextMap[application.status] || application.status
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi khi lấy trạng thái CV đã nộp",
      error: error.message
    });
  }
};

// PUT /api/applications/:id/status
// Cập nhật trạng thái CV đã nộp
export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["pending", "reviewing", "interviewing", "accepted", "rejected"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Trạng thái không hợp lệ",
        allowedStatuses
      });
    }

    const application = await JobApplication.findByPk(id);
    if (!application) {
      return res.status(404).json({ message: "Không tìm thấy hồ sơ ứng tuyển" });
    }

    await application.update({ status });

    return res.status(200).json({
      message: "Cập nhật trạng thái CV thành công",
      data: {
        ...application.toJSON(),
        statusText: statusTextMap[application.status] || application.status
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi khi cập nhật trạng thái CV",
      error: error.message
    });
  }
};
