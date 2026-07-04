import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DATABASE_DB, // tên db
  process.env.USERNAME_DB, // username
  process.env.PASSWORD_DB, // password pg
  {
    host: process.env.HOST_DB, // 5432
    port: process.env.PORT_DB, // localhost
    dialect: "postgres", // kết nói với pg
    logging: false,
  },
);

export default sequelize;
