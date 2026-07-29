import express from "express";
import {
  acceptedApplication,
  applyJob,
  getApplicationsByCandidate,
  getApplicationsByJob,
  getApplicationStatus,
  rejectedApplication
} from "../controllers/applicationController.js";

import {
  authMiddleware,
  isCompany
} from '../middlewares/authMiddleware.js'

import {
  cv
} from '../config/multer.js'

const router = express.Router();

/**
 * @swagger
 * /api/applications:
 *   post:
 *     summary: Ứng viên nộp CV ứng tuyển
 *     description: Tạo hồ sơ ứng tuyển cho một ứng viên vào một bài đăng tuyển dụng.
 *     tags: [Applications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApplicationInput'
 *     responses:
 *       201:
 *         description: Nộp CV ứng tuyển thành công
 *       400:
 *         description: Thiếu candidateId, jobId hoặc CV
 *       404:
 *         description: Không tìm thấy ứng viên hoặc bài tuyển dụng
 *       409:
 *         description: Ứng viên đã nộp CV cho bài tuyển dụng này
 *       500:
 *         description: Lỗi server
 */
router.post("/", authMiddleware, cv.single('cv'), applyJob);

/**
 * @swagger
 * /api/applications/candidate/{candidateId}:
 *   get:
 *     summary: Xem danh sách CV đã nộp của ứng viên
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: candidateId
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã ứng viên
 *     responses:
 *       200:
 *         description: Lấy danh sách CV đã nộp thành công
 *       404:
 *         description: Không tìm thấy ứng viên
 *       500:
 *         description: Lỗi server
 */
router.get("/candidate/me", authMiddleware, getApplicationsByCandidate);

/**
 * @swagger
 * /api/applications/job/{jobId}:
 *   get:
 *     summary: Nhà tuyển dụng xem danh sách CV đã nộp vào một bài tuyển dụng
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã bài tuyển dụng
 *     responses:
 *       200:
 *         description: Lấy danh sách ứng viên đã nộp CV thành công
 *       404:
 *         description: Không tìm thấy bài tuyển dụng
 *       500:
 *         description: Lỗi server
 */
router.get("/job/:jobId", authMiddleware, isCompany, getApplicationsByJob);

router.patch('/:applicationId/accepted', authMiddleware, isCompany, acceptedApplication);

router.patch('/:applicationId/rejected', authMiddleware, isCompany, rejectedApplication)

export default router;
