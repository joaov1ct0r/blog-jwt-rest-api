import express from "express";

import {
  handleAdminEditUser,
  handleAdminDeleteUser,
  handleAdminDeletePost
} from "../controllers/adminController.js";

import auth from "../middlewares/auth.js";

import admin from "../middlewares/admin.js";

const adminRouter: express.Router = express.Router();

adminRouter.put("/user/edit", auth, admin, handleAdminEditUser);

adminRouter.delete("/user/delete", auth, admin, handleAdminDeleteUser);

adminRouter.delete("/post/delete", auth, admin, handleAdminDeletePost);

export default adminRouter;