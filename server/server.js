import "dotenv/config";
import express from "express";
import sequelize from "./config/db.js";
import jobRoutes from "./routes/jobRoutes.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// API quản lý tuyển dụng: Đăng bài, Sửa/Xóa bài, Xem danh sách bài đăng
app.use("/api/jobs", jobRoutes);

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
