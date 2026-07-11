import express from "express";
import {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getFeaturedJob,
  getJobBySlug
} from "../controllers/jobController.js";

import {
  authMiddleware,
  isCompany
} from '../middlewares/authMiddleware.js'

const router = express.Router();

/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: Lấy danh sách bài đăng tuyển dụng
 *     description: Trả về danh sách bài đăng tuyển dụng. Có thể lọc theo từ khóa, địa điểm, danh mục, công ty và mức lương.
 *     tags: [Jobs]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Từ khóa tìm kiếm theo tiêu đề công việc
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Địa điểm làm việc
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *         description: Mã danh mục việc làm
 *       - in: query
 *         name: companyId
 *         schema:
 *           type: string
 *         description: Mã công ty đăng tuyển
 *       - in: query
 *         name: minSalary
 *         schema:
 *           type: integer
 *         description: Mức lương tối thiểu mong muốn
 *       - in: query
 *         name: maxSalary
 *         schema:
 *           type: integer
 *         description: Mức lương tối đa mong muốn
 *     responses:
 *       200:
 *         description: Lấy danh sách bài đăng thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/", getAllJobs);

router.get('/featured', getFeaturedJob);

router.get('/:slug/slug', getJobBySlug);

/**
 * @swagger
 * /api/jobs/{id}:
 *   get:
 *     summary: Xem chi tiết bài đăng tuyển dụng
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã bài đăng tuyển dụng
 *     responses:
 *       200:
 *         description: Lấy chi tiết bài đăng thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Không tìm thấy bài đăng
 *       500:
 *         description: Lỗi server
 */
router.get("/:jobId", getJobById);


/**
 * @swagger
 * /api/jobs:
 *   post:
 *     summary: Đăng bài tuyển dụng mới
 *     description: Tạo một bài đăng tuyển dụng mới cho công ty.
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JobInput'
 *     responses:
 *       201:
 *         description: Đăng bài tuyển dụng thành công
 *       400:
 *         description: Thiếu thông tin bắt buộc
 *       404:
 *         description: Không tìm thấy công ty hoặc danh mục việc làm
 *       409:
 *         description: Tiêu đề bài đăng đã tồn tại
 *       500:
 *         description: Lỗi server
 */
router.post("/", authMiddleware, isCompany, createJob);

/**
 * @swagger
 * /api/jobs/{id}:
 *   put:
 *     summary: Cập nhật bài đăng tuyển dụng
 *     description: Sửa thông tin bài đăng tuyển dụng theo mã bài đăng.
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã bài đăng cần sửa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JobInput'
 *     responses:
 *       200:
 *         description: Cập nhật bài đăng thành công
 *       404:
 *         description: Không tìm thấy bài đăng cần sửa
 *       409:
 *         description: Tiêu đề bài đăng đã tồn tại
 *       500:
 *         description: Lỗi server
 */
router.put("/:jobId", authMiddleware, isCompany, updateJob);

/**
 * @swagger
 * /api/jobs/{id}:
 *   delete:
 *     summary: Xóa bài đăng tuyển dụng
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã bài đăng cần xóa
 *     responses:
 *       200:
 *         description: Xóa bài đăng thành công
 *       404:
 *         description: Không tìm thấy bài đăng cần xóa
 *       500:
 *         description: Lỗi server
 */
router.delete("/:jobId", authMiddleware, isCompany, deleteJob);

export default router;
