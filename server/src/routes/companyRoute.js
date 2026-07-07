import express from 'express'
import { 
    getAllCompany, 
    getCompanyById,
    updateMyCompany
} from '../controllers/companyController.js';

import {
    authMiddleware,
    isCompany
} from '../middlewares/authMiddleware.js'

const router = express.Router();

router.get('/', getAllCompany);
router.get('/:companyId', getCompanyById)
router.put('/me', authMiddleware, isCompany, updateMyCompany)

export default router;