import express from 'express';
import { 
    createCategory, 
    deleteCategory, 
    getAllCategory, 
    updateCategory 
} from '../controllers/categoryJobController.js';
import {
    blockLoginCandidate,
    deleteCandidate, 
    getAllCandidate 
} from '../controllers/candidateController.js';
import { 
    getAllCompany,
    deleteCompany,
    updateActiveStatusCompany,
    rejectCompany,
    getCompanyById
} from '../controllers/companyController.js';
import { 
    activeJob,
    createJobAdmin, 
    deleteJob, 
    getAllJobs, 
    rejectJob
} from '../controllers/jobController.js';

import {
    authMiddleware,
    isAdmin
} from '../middlewares/authMiddleware.js';

const router = express.Router();

// category job
router.get('/categories', authMiddleware, isAdmin, getAllCategory);
router.post('/categories', authMiddleware, isAdmin, createCategory);
router.put('/categories/:categoryId', authMiddleware, isAdmin, updateCategory);
router.delete('/categories/:categoryId', authMiddleware, isAdmin, deleteCategory);

// candidate
router.get('/candidates', authMiddleware, isAdmin, getAllCandidate);
router.patch('/candidates/block', authMiddleware, isAdmin, blockLoginCandidate);
router.delete('/candidates/:candidateId', authMiddleware, isAdmin, deleteCandidate);

//company
router.get('/companies', authMiddleware, isAdmin, getAllCompany);
router.get('/companies/:companyId', authMiddleware, isAdmin, getCompanyById);
router.patch('/companies/active', authMiddleware, isAdmin, updateActiveStatusCompany);
router.patch('/companies/reject', authMiddleware, isAdmin, rejectCompany);
router.delete('/companies/:companyId', authMiddleware, isAdmin, deleteCompany);


// jobs
router.get('/jobs', authMiddleware, isAdmin, getAllJobs);
router.post('/jobs', authMiddleware, isAdmin, createJobAdmin);
router.patch('/jobs/:jobId/active', authMiddleware, isAdmin, activeJob);
router.patch('/jobs/:jobId/reject', authMiddleware, isAdmin, rejectJob);
router.delete('/jobs/:jobId', authMiddleware, isAdmin, deleteJob);

export default router;