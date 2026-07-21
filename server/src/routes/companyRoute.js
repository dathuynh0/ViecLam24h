import express from 'express'
import { 
    getAllCompany, 
    getCompanyBySlug,
    updateMyCompany,
    getFeaturedCompany,
    updateLogoMyCompany,
    followCompany,
    countFollow,
    unFollow
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
router.get('/:companyId/count', countFollow);
router.post('/:companyId/follow', authMiddleware, followCompany);
router.patch('/logo', avatar.single('logo'), authMiddleware, isCompany, updateLogoMyCompany);
router.put('/me', authMiddleware, isCompany, updateMyCompany);
router.delete('/:companyId/unfollow', authMiddleware, unFollow);

export default router;