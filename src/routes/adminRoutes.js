import express from 'express';

import {
    handleAdminEditUser,
    handleAdminDeleteUser,
    handleAdminDeletePost
} from '../controllers/adminController.js';

import auth from '../middlewares/auth.js';

import admin from '../middlewares/admin.js';

let adminRouter = express.Router();

adminRouter.put('/user/edit', auth, admin, handleAdminEditUser);

adminRouter.delete('/user/delete', auth, admin, handleAdminDeleteUser);

adminRouter.delete('/post/delete', admin, handleAdminDeletePost);

export default adminRouter;
