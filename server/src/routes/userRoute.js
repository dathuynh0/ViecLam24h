import express from 'express'
import {
    fetchMe
} from '../controllers/userController.js'

import {
    authMiddleware
} from '../middlewares/authMiddleware.js'

const router = express.Router();

router.get('/me', authMiddleware, fetchMe);

export default router;