import express from 'express';

import {
    handleNewUser,
    handleUserLogin,
    handleEditUser,
    handleDeleteUser,
    handleAllUsers,
    handleOneUser
} from '../controllers/userController.js';

import authController from '../middlewares/authController.js';

let userRouter = express.Router();

userRouter.post('/register', handleNewUser);

userRouter.post('/login', handleUserLogin);

userRouter.put('/edit/:id', authController, handleEditUser);
