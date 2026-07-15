import express from "express"
import {
    getAllCategory,
    getCategoryBySlug,
} from '../controllers/categoryJobController.js'


const router = express.Router();

router.get('/', getAllCategory);
router.get('/:slug', getCategoryBySlug);

export default router;