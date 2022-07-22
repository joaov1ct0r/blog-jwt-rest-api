import express from "express";

import UserController from "../controllers/userController";

import auth from "../middlewares/auth";

import IUserController from "../types/UserControllerInterface";

const userRouter: express.Router = express.Router();

const userController: IUserController = new UserController();

userRouter.post("/register", userController.handleNewUser);

userRouter.post("/login", userController.handleUserLogin);

userRouter.put("/edit", auth, userController.handleEditUser);

userRouter.delete("/delete", auth, userController.handleDeleteUser);

userRouter.get("/users", auth, userController.handleAllUsers);

userRouter.get("/user", auth, userController.handleOneUser);

export default userRouter;
