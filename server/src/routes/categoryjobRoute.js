import express from "express"
import {
    getAllCategory
} from '../controllers/categoryJobController.js'


const router = express.Router();

router.get('/', getAllCategory);

export default router;