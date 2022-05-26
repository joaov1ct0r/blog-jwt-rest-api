import "dotenv/config";

import cors from "cors";

import express from "express";

import postRouter from "./routes/postRoutes";

import userRouter from "./routes/userRoutes";

import adminRouter from "./routes/adminRoutes";

const app: express.Express = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);

app.use("/api/post", postRouter);

app.use("/api/admin", adminRouter);

app.listen(process.env.SERVER_PORT, (): void => {
  console.log("Server running!");
});
