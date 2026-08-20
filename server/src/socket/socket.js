import { Server } from 'socket.io'
import jwt from 'jsonwebtoken'

let io

const initSocket = async (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: process.env.CLIENT_URL,
            credentials: true
        }
    })

    // middleware xac thuc
    io.use((socket, next) => {
        try {
            const token = socket.handshake.auth?.token
            if (!token) {
                return next(new Error('Không tìm thấy token'))
            }

            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            socket.userId = decoded.userId
            next()
        } catch (err) {
            next(new Error("Token không hợp lệ"));
        }
    })

    io.on('connected', (socket) => {
        console.log(`user ${socket.userId} da ket noi thanh cong voi id: ${socket.id}`)

        socket.join(`user:${socket.userId}`)

        socket.on('disconnect', () => {
            console.log(`User ${socket.id} da ngat ket noi`)
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