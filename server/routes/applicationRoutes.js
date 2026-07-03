import express from "express";
import {
  applyJob,
  getApplicationsByCandidate,
  getApplicationsByJob,
  getApplicationStatus,
  updateApplicationStatus
} from "../controllers/applicationController.js";

const router = express.Router();

router.post("/", applyJob);
router.get("/candidate/:candidateId", getApplicationsByCandidate);
router.get("/job/:jobId", getApplicationsByJob);
router.get("/:id/status", getApplicationStatus);
router.put("/:id/status", updateApplicationStatus);

export default router;
