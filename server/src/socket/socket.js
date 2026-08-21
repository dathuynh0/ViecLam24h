import { Server } from 'socket.io'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import Candidate from '../models/Candidate.js'

let io

const initSocket = async (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: process.env.CLIENT_URL,
            credentials: true
        }
    })

    // middleware xac thuc
    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth?.token
            if (!token) {
                return next(new Error('Không tìm thấy token'))
            }

            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            const user = await User.findByPk(decoded.userId, {
                attributes: { exclude: ['password'] },
                include: [
                    { model: Candidate, as: 'candidate'}
                ]
            });
            socket.candidateId = user.candidate.id
            next()
        } catch (err) {
            next(new Error("Token không hợp lệ"));
        }
    })

    io.on('connection', (socket) => {
        console.log(`candidate ${socket.candidateId} da ket noi thanh cong voi id: ${socket.id}`)

        socket.join(`candidate:${socket.candidateId}`)

        socket.on('disconnect', () => {
            console.log(`candidate ${socket.id} da ngat ket noi`)
        })
    })

    return io
}

const getIO = () => {
    if (!io) {
        throw new Error('Socket.io chưa được khởi tạo')
    }
    
    return io
}

export {
    initSocket,
    getIO
}