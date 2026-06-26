import "dotenv/config";
import express from "express";
import sequelize from "./config/db.js";

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello my server node");
});

sequelize
  .sync({ alter: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server đang chạy trên port http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error("Lỗi khi kết nối với CSDL: ", error));
