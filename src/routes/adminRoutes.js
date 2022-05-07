import express from 'express';

import {
    handleAdminEditUser,
    handleAdminDeleteUser,
    handleAdminDeletePost
} from '../controllers/adminController.js';

import admin from '../middlewares/admin.js';

let adminRouter = express.Router();

adminRouter.post('/user/edit', admin, handleAdminEditUser);
