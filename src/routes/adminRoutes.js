import express from 'express';

import {
    handleAdminEditUser,
    handleAdminDeleteUser,
    handleAdminDeletePost
} from '../controllers/adminController.js';

import admin from '../middlewares/admin.js';
