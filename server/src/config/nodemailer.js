import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = async (to, subject, html) => {
    try {
        await transporter.sendMail({
            from: `"ViecLam24h" <${process.env.SMTP_USER}>`,
            to,
            subject,
            html
        })
        console.log('Gửi mail thành công')
    } catch (error) {
        console.error('Gửi mail thất bại:', error.message)
    }
}

export default sendEmail