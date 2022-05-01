import express from 'express';

import {
    handleNewUser,
    handleUserLogin,
    handleEditUser,
    handleDeleteUser,
    handleAllUsers,
    handleOneUser
} from '../controllers/userController.js';

import authController from '../middlewares/auth.js';

import adminController from '../middlewares/admin.js';

let userRouter = express.Router();

userRouter.post('/register', handleNewUser);

userRouter.post('/login', handleUserLogin);

userRouter.put('/edit/:id', authController, adminController, handleEditUser);

userRouter.delete(
    '/delete/:id',
    authController,
    adminController,
    handleDeleteUser
);

userRouter.get('/users', authController, handleAllUsers);

userRouter.get('/:id', authController, handleOneUser);

export default userRouter;
