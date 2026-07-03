import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import sequelize from "./config/db.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());

// API quản lý tuyển dụng: Đăng bài, Sửa/Xóa bài, Xem danh sách bài đăng
app.use("/api/jobs", jobRoutes);

// API ứng tuyển: nộp CV, danh sách CV đã nộp, trạng thái CV
app.use("/api/applications", applicationRoutes);

app.get("/", (req, res) => {
  res.send("API ViecLam24h đang chạy");
});

sequelize.sync({ alter: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server đang chạy trên port http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error("Lỗi khi kết nối với CSDL: ", error));
