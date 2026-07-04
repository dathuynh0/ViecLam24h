import express from "express";
import {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob
} from "../controllers/jobController.js";

import { authMiddleware, isCompany } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.post("/", authMiddleware, isCompany, createJob);
router.put("/:id", authMiddleware, isCompany, updateJob);
router.delete("/:id", authMiddleware, isCompany, deleteJob);

export default router;
