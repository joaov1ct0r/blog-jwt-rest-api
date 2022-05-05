import express from 'express';

import {
    handleNewPost,
    handleEditPost,
    handleDeletePost,
    handleAllPosts,
    handleOnePost
} from '../controllers/postController.js';

import authController from '../middlewares/auth.js';
