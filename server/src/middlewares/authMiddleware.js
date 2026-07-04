import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import Company from '../models/Company.js';


const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if(!token) {
            return res.status(401).json({ message: "Không tìm thấy token" });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if(!decoded) {
            return res.status(403).json({ message: "Token không hợp lệ hoặc hết hạn" });
        }

        const user = await User.findByPk(decoded.userId);
        if(!user) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Lỗi khi gọi authMiddleware: ', error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

const isCompany = async (req, res, next) => {
    try {
        if(req.user.role !== 'company') {
            return res.status(403).json({ message: "Bạn không phải là công ty" });
        }

        const company = await Company.findOne({ where: { userId: req.user.id } });
        if(company.status !== 'active') {
            return res.status(403).json({ message: "Công ty chưa được duyệt" });
        }

        next();
    } catch (error) {
        console.error('Lỗi khi gọi isCompany: ', error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

const isAdmin = async (req, res, next) => {
    try {
        if(req.user.role !== 'admin') {
            return res.status(403).json({ message: "Bạn không có quyền truy cập" });
        }

        next();
    } catch (error) {
        console.error('Lỗi khi gọi isAdmin: ', error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

export {
    authMiddleware,
    isAdmin,
    isCompany
}