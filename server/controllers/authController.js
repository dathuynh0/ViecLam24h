import User from '../models/User.js';
import Candidate from '../models/Candidate.js';
import Company from '../models/Company.js';

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


export {
    signUp,
    signIn,
    signOut
}