import User from '../models/User.js';
import Candidate from '../models/Candidate.js';
import Company from '../models/Company.js';
import Session from '../models/Session.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';


const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000; // 14 ngày

const signUp = async (req, res) => {
    try {
        const { username, password, email, fullName, role } = req.body;

        if(!username || !password || !email || !fullName || !role) {
            return res.status(400).json({ message: "Username, password, email, fullName và role không được trống" });
        }

        // check username va email
        const existingUsername = await User.findOne({ where: { username }});
        if(existingUsername) {
            return res.status(400).json({ message: "Username đã tồn tại" });
        }

        const existingEmail = await User.findOne({ where: { email } });
        if(existingEmail) {
            return res.status(400).json({ message: "Email đã tồn tại" });
        }

        if(role !== 'candidate' && role !== 'company') {
            return res.status(400).json({ message: "Role không hợp lệ" });
        }

        // hash password
        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashPassword
        })
        
        if(role === 'company') {
            newUser.role = 'company';
        }
        await newUser.save();
        
        if(role === 'candidate') {
            await Candidate.create({
                userId: newUser.id,
                fullName
            })
        }
        else // company
        {
            await Company.create({
                userId: newUser.id,
                companyName: fullName
            })
        }

        return res.status(201).json({ message: 'Tạo tài khoản thành công', newUser });
    } catch (error) {
        console.error('Lỗi khi gọi hàm signUp: ', error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

const signIn = async (req, res) => {
    try {
        const { username, password } = req.body;

        if(!username || !password) {
            return res.status(400).json({ message: 'Username và password không được trống' });
        }

        const user = await User.findOne({ where: { username }, include: [
            { model: Company, as: 'company'}
        ] });

        if(!user) {
            return res.status(400).json({ message: 'Username hoặc password không đúng' });
        }

        if(user.company && user.company.status === 'pending') {
            return res.status(403).json({ message: 'Tài khoản của bạn đang chờ duyệt' });
        }

        // check status của tài khoản
        if(user.status === 'inactive') {
            return res.status(403).json({ message: 'Tài khoản của bạn đã bị khóa' });
        }


        const isPasswordTrue = await bcrypt.compare(password, user.password);
        if(!isPasswordTrue) {
            return res.status(400).json({ message: 'Username hoặc password không đúng' });
        }

        const accessToken = jwt.sign(
            { userId: user.id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        // lưu refresh token
        const refreshToken = crypto.randomBytes(64).toString('hex');
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: REFRESH_TOKEN_TTL
        })

        await Session.create({
            userId: user.id,
            refreshToken,
            expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL)
        })

        return res.status(200).json({ message: `Đăng nhập thành công với username ${user.username}`, accessToken });
    } catch (error) {
        console.error('Lỗi khi gọi hàm signIn: ', error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

const signOut = async (req, res) => {
    try {
        const token = req.cookies?.refreshToken;

        if(token) {
            await Session.destroy({ where: { refreshToken: token } });
            res.clearCookie('refreshToken');
        }

        return res.sendStatus(204);
    } catch (error) {
        console.error('Lỗi khi gọi hàm signOut: ', error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies?.refreshToken;

        if(!refreshToken) {
            return res.status(401).json({ message: "Không tìm thấy refreshToken" });
        }

        const session = await Session.findOne({ where: { refreshToken } });
        if(!session) {
            return res.status(403).json({ message: "RefreshToken không hợp lệ hoặc hết hạn" });
        }

        if(session.expiresAt < new Date()) {
            return res.status(403).json({ message: "RefreshToken không hợp lệ hoặc hết hạn" });
        }

        const accessToken = jwt.sign(
            { userId: session.userId },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' }
        )

        return res.status(200).json({ accessToken });
    } catch (error) {
        console.error('Lỗi khi gọi hàm refreshToken: ', error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}


export {
    signUp,
    signIn,
    signOut,
    refreshToken
}