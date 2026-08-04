import express from "express";
import {
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getFeaturedJob,
  getJobBySlug,
  getJobByCategory,
  searchJob,
  getJobCreated,
  getRelatedJob
} from "../controllers/jobController.js";

import {
  authMiddleware,
  isCompany
} from '../middlewares/authMiddleware.js'

const router = express.Router();

router.get('/featured', getFeaturedJob);

router.get('/:slug/slug', getJobBySlug);

router.get('/:slug/category', getJobByCategory);

router.get('/:jobId/related', getRelatedJob);

router.get('/search', searchJob);

router.get('/created', authMiddleware, isCompany, getJobCreated);

router.get("/:jobId", getJobById);

router.post("/", authMiddleware, isCompany, createJob);

router.put("/:jobId", authMiddleware, isCompany, updateJob);

router.delete("/:jobId", authMiddleware, isCompany, deleteJob);

export default router;
