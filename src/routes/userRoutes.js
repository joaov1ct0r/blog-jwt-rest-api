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

let userRouter = express.Router();

userRouter.post('/register', handleNewUser);

userRouter.post('/login', handleUserLogin);

userRouter.put('/edit', authController, handleEditUser);

userRouter.delete('/delete', authController, handleDeleteUser);

userRouter.get('/users', authController, handleAllUsers);

userRouter.get('/user', authController, handleOneUser);

export default userRouter;
