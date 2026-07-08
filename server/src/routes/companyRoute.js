import express from 'express'
import { 
    getAllCompany, 
    getCompanyById,
    updateMyCompany,
    updateLogoCompany
} from '../controllers/companyController.js';
import { avatar } from '../config/multer.js';

import {
    authMiddleware,
    isCompany
} from '../middlewares/authMiddleware.js'

const router = express.Router();

router.get('/', getAllCompany);
router.get('/:companyId', getCompanyById);
router.put('/logo', avatar.single('logo'), authMiddleware, isCompany, updateLogoCompany);
router.put('/me', authMiddleware, isCompany, updateMyCompany);

export default router;