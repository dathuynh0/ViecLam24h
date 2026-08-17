import User from '../models/User.js';
import Candidate from '../models/Candidate.js';
import Company from '../models/Company.js';
import Session from '../models/Session.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

import toSlug from '../utils/slug.js';
import validateEmail from '../utils/email.js'
import sendEmail from '../config/nodemailer.js';


const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000; // 14 ngày

const signUp = async (req, res) => {
    try {
        const { username, password, email, fullName, role } = req.body;

        if(!username || !password || !email || !fullName || !role) {
            return res.status(400).json({ message: "Username, password, email, fullName và role không được trống" });
        }

        if(password.length  < 6) {
            return res.status(400).json({ message: 'Độ dài mật khẩu tối thiều 6 kí tự' })
        }

        if(!validateEmail(email)) {
            return res.status(400).json({ message: 'Email không hợp lệ '});
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
            newUser.status = 'active'
            newUser.role = 'company';
        }
        await newUser.save();
        
        const token = jwt.sign(
            {
                userId: newUser.id
            },
                process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '1h'
            }
        )

        const verifyUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`

        if(role === 'candidate') {
            await Candidate.create({
                userId: newUser.id,
                fullName
            })
            sendEmail(
                newUser.email,
                'Xác thực email',
                `
                    <!DOCTYPE html>
                    <html lang="vi">
                        <head>
                        <meta charset="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <title>Xác thực email</title>
                        </head>
                        <body style="margin:0; padding:0; background-color:#f4f5f7; font-family: Arial, Helvetica, sans-serif;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f5f7; padding: 40px 0;">
                                <tr>
                                <td align="center">
                                    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
                                    
                                    <!-- Header -->
                                    <tr>
                                        <td style="background-color:#2563eb; padding: 24px 32px;">
                                        <h1 style="margin:0; color:#ffffff; font-size:22px;">ViecLam24h</h1>
                                        </td>
                                    </tr>

                                    <!-- Body -->
                                    <tr>
                                        <td style="padding: 32px;">
                                        <h2 style="margin-top:0; color:#111827; font-size:20px;">Xác thực địa chỉ email</h2>
                                        <p style="color:#374151; font-size:15px; line-height:1.6;">
                                            Xin chào <strong>${fullName || 'bạn'}</strong>,
                                        </p>
                                        <p style="color:#374151; font-size:15px; line-height:1.6;">
                                            Cảm ơn bạn đã đăng ký tài khoản tại <strong>ViecLam24h</strong>. Vui lòng nhấn vào nút bên dưới để xác thực địa chỉ email của bạn:
                                        </p>

                                        <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 28px 0;">
                                            <tr>
                                                <td align="center" style="border-radius:6px; background-color:#2563eb;">
                                                    <a href="${verifyUrl}" target="_blank"
                                                    style="display:inline-block; padding: 12px 28px; font-size:15px; color:#ffffff; text-decoration:none; font-weight:bold; border-radius:6px;">
                                                        Xác thực ngay
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>

                                        <p style="color:#9ca3af; font-size:13px; margin-top:24px;">
                                            Liên kết này sẽ hết hạn sau 1 giờ. Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email.
                                        </p>
                                        </td>
                                    </tr>

                                    <!-- Footer -->
                                    <tr>
                                        <td style="background-color:#f9fafb; padding: 20px 32px; text-align:center;">
                                        <p style="margin:0; color:#9ca3af; font-size:12px;">
                                            © ${new Date().getFullYear()} ViecLam24h. Mọi quyền được bảo lưu.
                                        </p>
                                        </td>
                                    </tr>

                                    </table>
                                </td>
                                </tr>
                            </table>
                        </body>
                    </html>
                `
            )
        }
        else // company
        {
            await Company.create({
                userId: newUser.id,
                companyName: fullName,
                slug: toSlug(fullName)
            })
        }

        return res.status(201).json({ message: 'Tạo tài khoản thành công', newUser });
    } catch (error) {
        console.error('Lỗi khi gọi hàm signUp: ', error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

const verifyEmail = async (req, res) => {
    try {
        const { token } = req.body

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        if (!decoded) {
            return res.status(400).json({ message: 'Token hết hạn hoặc không đúng' })
        }

        const user = await User.findByPk(decoded.userId)

        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy user' })
        }

        user.status = 'active'
        await user.save()

        return res.status(200).json({ message: 'Xác thực email thành công ', user })
    } catch (error) {
        console.error('Lỗi khi gọi hàm verifyEmail: ', error);
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

        if(user.company && (user.company.status === 'pending' || user.company.status === 'inactive')) {
            return res.status(403).json({ message: 'Tài khoản của bạn đang chờ duyệt hoặc bị khóa' });
        }

        // check status của tài khoản
        if(user.status === 'inactive' || user.status === 'pending') {
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

const googleCallback = async (req, res) => {
    try {
        const user = req.user; // Passport gắn user vào req.user

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

        res.redirect(
            `${process.env.CLIENT_URL}/oauth?accessToken=${accessToken}`
        );
    } catch (error) {
        console.error('Lỗi khi gọi hàm googleCallback: ', error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}


export {
    signUp,
    signIn,
    signOut,
    refreshToken,
    googleCallback,
    verifyEmail
}