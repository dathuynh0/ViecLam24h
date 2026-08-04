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
    const { jobId, introduction } = req.body;
    const candidate = req.user.candidate;

    if (!jobId) {
      return res.status(400).json({
        message: "Vui lòng nhập đầy đủ jobId"
      });
    }
    
    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ message: "Không tìm thấy bài tuyển dụng" });
    }

    const finalCVUrl = req.file.path || candidate.cvUrl;
    if (!finalCVUrl) {
      return res.status(400).json({
        message: "Vui lòng cung cấp applyCVUrl hoặc cập nhật CV trong hồ sơ ứng viên"
      });
    }

    const existedApplication = await JobApplication.findOne({
      where: { candidateId: candidate.id, jobId }
    });

    if (existedApplication) {
      return res.status(409).json({
        message: "Ứng viên đã nộp CV cho bài tuyển dụng này rồi",
        data: existedApplication
      });
    }

    const application = await JobApplication.create({
      candidateId: candidate.id,
      jobId,
      applyCVUrl: finalCVUrl,
      introduction
    });

    return res.status(201).json({
      message: "Nộp CV ứng tuyển thành công",
      application
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
    const candidate = req.user.candidate;
    const status = req.query.status;
    const where = { candidateId: candidate.id };

    if(status && status !== 'all') {
      where.status = status;
    }

    const applications = await JobApplication.findAll({
      where,
      include: [
        {
          model: Job,
          as: "job",
          attributes: ["id", "title", "salaryMin", "salaryMax", "location", 'slug'],
          include: [
            {
              model: Company,
              as: "createdBy",
              attributes: ["id", "companyName", 'logoUrl', "address", "status", "companySize"]
            }
          ]
        }
      ],
      order: [["createdAt", "DESC"]]
    });

    return res.status(200).json({ message: "Lấy danh sách CV đã nộp thành công", applications });
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
    const page = req.query.page || 1;
    const limit = 5;
    const offset = (page - 1) * limit;

    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ message: "Không tìm thấy bài tuyển dụng" });
    }

    const { count, rows: applications } = await JobApplication.findAndCountAll({
      where: { jobId },
      include: [
        {
          model: Candidate,
          as: "candidate",
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

    const totalPage = Math.ceil(count / limit);

    return res.status(200).json({
      message: "Lấy danh sách ứng viên đã nộp CV thành công",
      applications,
      totalPage
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



export const acceptedApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await JobApplication.findByPk(applicationId);
    if(!application) {
      return res.status(404).json({ message: 'Không tìm thấy bài ứng tuyển '});
    }

    application.status = 'accepted';
    await application.save();


    return res.status(200).json({ message: 'Chấp nhận ứng viên thành công '});
  } catch (error) {
    console.error('Lỗi khi gọi hàm acceptedApplication ', error)
    return res.status(500).json({ message: 'Lỗi server '});
  }
}

export const rejectedApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await JobApplication.findByPk(applicationId);
    if(!application) {
      return res.status(404).json({ message: 'Không tìm thấy bài ứng tuyển '});
    }

    application.status = 'rejected';
    await application.save();

    return res.status(200).json({ message: 'Từ chối ứng viên thành công '});
  } catch (error) {
    console.error('Lỗi khi gọi hàm rejectedApplication ', error)
    return res.status(500).json({ message: 'Lỗi server '});
  }
}

export const deleteApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await JobApplication.findByPk(applicationId);
    if(!application) {
      return res.status(404).json({ message: 'Không tìm thấy bài ứng tuyển '});
    }

    await application.destroy();

    return res.status(200).json({ message: 'Xóa ứng viên thành công '});
  } catch (error) {
    console.error('Lỗi khi gọi hàm deleteApplication ', error)
    return res.status(500).json({ message: 'Lỗi server '});
  }
}