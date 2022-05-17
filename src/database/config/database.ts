import { Sequelize } from "sequelize";

export const DB: Sequelize = new Sequelize(String(process.env.DB_DATABASE), String(process.env.DB_USER), String(process.env.DB_PASSWORD), {
  dialect: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT)
});
