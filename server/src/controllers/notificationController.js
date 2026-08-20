import Candidate from '../models/Candidate.js'
import Notification from '../models/Notification.js'
import User from '../models/User.js'

import { getIO } from '../socket/socket.js'

const getAllNotification = async (req, res) => {
    try {
        const { candidateId } = req.params

        const user = await Candidate.findByPk(candidateId)
        if (!user) {
            return res.status(404).json({ message: 'Khong tim thay user' })
        }

        const notifications = await Notification.findAll({
            where: {
                to: user.id
            }
        })

        return res.status(200).json({ notifications })
    } catch (error) {
        console.error('Lỗi khi gọi hàm getAllNotification ', error)
        return res.status(500).json({ message: 'Lỗi server' })
    }
}

const readNotification = async (req, res) => {
    try {
        const { notificationId } = req.params

        const notification = await Notification.findByPk(notificationId)
        if (!notification) {
            return res.status(404).json({ message: 'Không tìm thấy thông báo' })
        }
        notification.read = true
        await notification.save()

        return res.status(200).json({ message: 'Cap nhat doc thong bao thanh cong', notification })
    } catch (error) {
        console.error('Lỗi khi gọi hàm readNotification ', error)
        return res.status(500).json({ message: 'Lỗi server' })
    }
}

export {
    getAllNotification,
    readNotification
}