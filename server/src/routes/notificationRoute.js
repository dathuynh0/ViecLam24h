import express from 'express'
import {
    getAllNotification,
    readNotification
} from '../controllers/notificationController.js'

const router = express.Router()

router.get('/:candidateId', getAllNotification)
router.patch('/:notificationId', readNotification)

export default router