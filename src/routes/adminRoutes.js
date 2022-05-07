import express from 'express';

import {
    handleAdminEditUser,
    handleAdminDeleteUser,
    handleAdminDeletePost
} from '../controllers/adminController.js';

import admin from '../middlewares/admin.js';

let adminRouter = express.Router();

adminRouter.put('/user/edit', admin, handleAdminEditUser);

adminRouter.delete('/user/delete', admin, handleAdminDeleteUser);
