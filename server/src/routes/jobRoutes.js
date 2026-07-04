import express from "express";
import {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob
} from "../controllers/jobController.js";

import { isCompany } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.post("/", isCompany, createJob);
router.put("/:id", isCompany, updateJob);
router.delete("/:id", isCompany, deleteJob);

export default router;
