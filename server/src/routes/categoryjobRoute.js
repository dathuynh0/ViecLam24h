import express from "express"
import {
    getAllCategory,
    createCategory,
    updateCategory,
    deleteCategory,
} from '../controllers/categoryJobController.js'

import { icon } from '../config/multer.js'
import {
    authMiddleware,
    isAdmin
} from '../middlewares/authMiddleware.js'

const router = express.Router();

router.get('/', getAllCategory)
router.post('/', icon.single('icon'), authMiddleware, isAdmin, createCategory)
router.put('/:categoryId', icon.single('icon'), authMiddleware, isAdmin, updateCategory)
router.delete('/:categoryId', authMiddleware, isAdmin, deleteCategory)


export default router;