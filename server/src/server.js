import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import sequelize from "./config/db.js";
import adminRoutes from "./routes/adminRoute.js"
import authRoutes from "./routes/authRoute.js";
import categoryjobRoutes from "./routes/categoryjobRoute.js"
import userRoutes from "./routes/userRoute.js"
import candidateRoutes from "./routes/candidateRoute.js"
import companyRoutes from "./routes/companyRoute.js"
import jobRoutes from "./routes/jobRoute.js";
import applicationRoutes from "./routes/applicationRoute.js";
import notificationRoutes from "./routes/notificationRoute.js"
import { authMiddleware } from "./middlewares/authMiddleware.js";

import http from 'http'
import { initSocket } from "./socket/socket.js";
import passport from './config/passport.js';

const app = express();
const PORT = process.env.PORT || 8080;
const server = http.createServer(app)
initSocket(server)

app.use(passport.initialize());
app.use(express.json());
app.use(cookieParser());
app.use("/public/uploads" ,express.static('public/uploads'));
app.use(cors({ 
  origin: process.env.CLIENT_URL, 
  credentials: true,
}));

// admin route
app.use("/api/admin", adminRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryjobRoutes);
app.use("/api/users", userRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use('/api/notifications', authMiddleware, notificationRoutes)


sequelize.sync({ alter: true })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server đang chạy trên port http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error("Lỗi khi kết nối với CSDL: ", error));
