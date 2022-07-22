import cors from "cors";

import express from "express";

import cookieParser from "cookie-parser";

import postRouter from "./routes/postRoutes";

import userRouter from "./routes/userRoutes";

import adminRouter from "./routes/adminRoutes";

export default class App {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.middlewares();
    this.userRoutes();
    this.postRoutes();
    this.adminRoutes();
  }

  private middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(cookieParser());
    this.server.use(express.urlencoded({ extended: true }));
  }

  private userRoutes() {
    this.server.use("/api/user", userRouter);
  }

  private postRoutes() {
    this.server.use("/api/post", postRouter);
  }

  private adminRoutes() {
    this.server.use("/api/admin", adminRouter);
  }
}
