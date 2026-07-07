import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import sequelize from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import userRoutes from "./routes/userRoute.js"
import companyRoutes from "./routes/companyRoute.js"
import jobRoutes from "./routes/jobRoute.js";
import applicationRoutes from "./routes/applicationRoute.js";


const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.use('/api/users', userRoutes);
app.use("/api/companies", companyRoutes)
// API quản lý tuyển dụng: Đăng bài, Sửa/Xóa bài, Xem danh sách bài đăng
app.use("/api/jobs", jobRoutes);
// API ứng tuyển: nộp CV, danh sách CV đã nộp, trạng thái CV
app.use("/api/applications", applicationRoutes);


sequelize.sync({ alter: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server đang chạy trên port http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error("Lỗi khi kết nối với CSDL: ", error));
