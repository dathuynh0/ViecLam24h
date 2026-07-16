import express from 'express';
import { 
    deleteSaveJob,
    getAllMySaveJob,
    saveJob,
    updateAvatar,
    updateMyProfile,
    updateCV
} from '../controllers/candidateController.js';
import { avatar, cv } from '../config/multer.js'

import {
    authMiddleware
} from '../middlewares/authMiddleware.js'

const router = express.Router();

router.put('/avatar', avatar.single('avatar'), authMiddleware, updateAvatar);
router.put('/cv', cv.single('cv'), authMiddleware, updateCV);
router.put('/me', authMiddleware, updateMyProfile);

//saveJob
router.get('/job-save/me', authMiddleware, getAllMySaveJob);
router.post('/job-save', authMiddleware, saveJob);
router.delete('/job-save/:jobsaveId', authMiddleware, deleteSaveJob);


export default router;