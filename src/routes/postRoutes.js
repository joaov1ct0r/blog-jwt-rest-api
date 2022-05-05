import express from 'express';

import {
    handleNewPost,
    handleEditPost,
    handleDeletePost,
    handleAllPosts,
    handleOnePost
} from '../controllers/postController.js';

import authController from '../middlewares/auth.js';

let postRouter = express.Router();

postRouter.post('/register', authController, handleNewPost);

postRouter.put('/edit', authController, handleEditPost);

postRouter.delete('/delete', authController, handleDeletePost);
