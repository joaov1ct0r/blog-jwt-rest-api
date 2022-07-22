import "dotenv/config";

import cors from "cors";

import express from "express";

import cookieParser from "cookie-parser";

import postRouter from "./routes/postRoutes";

import userRouter from "./routes/userRoutes";

import adminRouter from "./routes/adminRoutes";

export default class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.userRoutes();
    this.postRoutes();
    this.adminRoutes();
  }

  private middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private userRoutes() {
    this.app.use("/api/user", userRouter);
  }

  private postRoutes() {
    this.app.use("/api/post", postRouter);
  }

  private adminRoutes() {
    this.app.use("/api/admin", adminRouter);
  }
}
