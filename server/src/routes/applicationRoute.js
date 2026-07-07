import express from "express";
import {
  applyJob,
  getApplicationsByCandidate,
  getApplicationsByJob,
  getApplicationStatus,
  updateApplicationStatus
} from "../controllers/applicationController.js";

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
router.post("/", applyJob);

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
router.get("/candidate/:candidateId", getApplicationsByCandidate);

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
router.get("/job/:jobId", getApplicationsByJob);

/**
 * @swagger
 * /api/applications/{id}/status:
 *   get:
 *     summary: Xem trạng thái hồ sơ ứng tuyển
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã hồ sơ ứng tuyển
 *     responses:
 *       200:
 *         description: Lấy trạng thái CV đã nộp thành công
 *       404:
 *         description: Không tìm thấy hồ sơ ứng tuyển
 *       500:
 *         description: Lỗi server
 */
router.get("/:id/status", getApplicationStatus);

/**
 * @swagger
 * /api/applications/{id}/status:
 *   put:
 *     summary: Cập nhật trạng thái hồ sơ ứng tuyển
 *     description: Cập nhật trạng thái CV, ví dụ pending, reviewing, interviewing, accepted hoặc rejected.
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã hồ sơ ứng tuyển
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ApplicationStatusUpdate'
 *     responses:
 *       200:
 *         description: Cập nhật trạng thái CV thành công
 *       400:
 *         description: Trạng thái không hợp lệ
 *       404:
 *         description: Không tìm thấy hồ sơ ứng tuyển
 *       500:
 *         description: Lỗi server
 */
router.put("/:id/status", updateApplicationStatus);

export default router;
