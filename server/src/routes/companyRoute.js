import express from 'express'
import { 
    getAllCompany, 
    getCompanyBySlug,
    updateMyCompany,
    getFeaturedCompany,
    updateLogoMyCompany,
    followCompany
} from '../controllers/companyController.js';
import { avatar } from '../config/multer.js';

import {
    authMiddleware,
    isCompany
} from '../middlewares/authMiddleware.js'

const router = express.Router();

router.get('/', getAllCompany);
router.get('/featured', getFeaturedCompany);
router.get('/:slug', getCompanyBySlug);
router.patch('/:companyId/follow', followCompany);
router.put('/logo', avatar.single('logo'), authMiddleware, isCompany, updateLogoMyCompany);
router.put('/me', authMiddleware, isCompany, updateMyCompany);

export default router;