import sequelize from "sequelize";

const DB: sequelize.Sequelize = new sequelize.Sequelize(String(process.env.DB_DATABASE), String(process.env.DB_USER), String(process.env.DB_PASSWORD), {
  dialect: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT)
});

export default DB;
