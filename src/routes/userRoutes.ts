import express from "express";

import UserController from "../controllers/userController";

import auth from "../middlewares/auth";

const userRouter: express.Router = express.Router();

userRouter.post("/register", UserController.handleNewUser);

userRouter.post("/login", UserController.handleUserLogin);

userRouter.put("/edit", auth, UserController.handleEditUser);

userRouter.delete("/delete", auth, UserController.handleDeleteUser);

userRouter.get("/users", auth, UserController.handleAllUsers);

userRouter.get("/user", auth, UserController.handleOneUser);

export default userRouter;
