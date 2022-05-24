import sequelize from "sequelize";

const DB: sequelize.Sequelize = new sequelize.Sequelize(process.env.DB_DATABASE as string, process.env.DB_USER as string, process.env.DB_PASSWORD as string, {
  dialect: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT)
});

export default DB;
