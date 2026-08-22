import express from "express";
import {
  acceptedApplication,
  applyJob,
  deleteApplication,
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


router.post("/", authMiddleware, cv.single('cv'), applyJob);

router.get("/candidate/me", authMiddleware, getApplicationsByCandidate);

router.get("/job/:jobId", authMiddleware, isCompany, getApplicationsByJob);

router.patch('/:applicationId/accepted', authMiddleware, isCompany, acceptedApplication);

router.patch('/:applicationId/rejected', authMiddleware, isCompany, rejectedApplication);

router.delete('/:applicationId', authMiddleware, deleteApplication);

export default router;
