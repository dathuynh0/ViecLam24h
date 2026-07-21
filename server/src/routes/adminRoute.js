import express from 'express';
import { 
    createCategory, 
    deleteCategory, 
    getAllCategoryAdmin, 
    updateCategory 
} from '../controllers/categoryJobController.js';
import {
    activeCandidate,
    blockLoginCandidate,
    deleteCandidate, 
    getAllCandidate 
} from '../controllers/candidateController.js';
import { 
    getAllCompany,
    deleteCompany,
    updateActiveStatusCompany,
    rejectCompany,
    getCompanyBySlug,
    updateCompany,
    updateLogoCompany,
    getAllCompanyByAdmin
} from '../controllers/companyController.js';
import { 
    activeJob,
    createJobAdmin, 
    deleteJob, 
    getAllJobAdmin,
    rejectJob
} from '../controllers/jobController.js';

import {
    authMiddleware,
    isAdmin
} from '../middlewares/authMiddleware.js';

import {
    avatar
} from '../config/multer.js'
import { getApplicationsByJob } from '../controllers/applicationController.js';

const router = express.Router();

// category job
router.get('/categories', authMiddleware, isAdmin, getAllCategoryAdmin);
router.post('/categories', authMiddleware, isAdmin, createCategory);
router.put('/categories/:categoryId', authMiddleware, isAdmin, updateCategory);
router.delete('/categories/:categoryId', authMiddleware, isAdmin, deleteCategory);

// candidate
router.get('/candidates', authMiddleware, isAdmin, getAllCandidate);
router.patch('/candidates/active', authMiddleware, isAdmin, activeCandidate);
router.patch('/candidates/block', authMiddleware, isAdmin, blockLoginCandidate);
router.delete('/candidates/:candidateId', authMiddleware, isAdmin, deleteCandidate);

//company
router.get('/companies', authMiddleware, isAdmin, getAllCompanyByAdmin);
router.get('/companies/:slug', authMiddleware, isAdmin, getCompanyBySlug);
router.put('/companies/:companyId', authMiddleware, isAdmin, updateCompany);
router.patch('/companies/logo', avatar.single('logo'), authMiddleware, isAdmin, updateLogoCompany);
router.patch('/companies/active', authMiddleware, isAdmin, updateActiveStatusCompany);
router.patch('/companies/reject', authMiddleware, isAdmin, rejectCompany);
router.delete('/companies/:companyId', authMiddleware, isAdmin, deleteCompany);


// jobs
router.get('/jobs', authMiddleware, isAdmin, getAllJobAdmin);
router.post('/jobs', authMiddleware, isAdmin, createJobAdmin);
router.patch('/jobs/:jobId/active', authMiddleware, isAdmin, activeJob);
router.patch('/jobs/:jobId/reject', authMiddleware, isAdmin, rejectJob);
router.delete('/jobs/:jobId', authMiddleware, isAdmin, deleteJob);

// application
router.get('/applications/:jobId', authMiddleware, isAdmin, getApplicationsByJob);

export default router;