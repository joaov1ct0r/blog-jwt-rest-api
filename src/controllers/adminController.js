import User from '../models/userModel.js';

import Post from '../models/postModel.js';

import bcrypt from 'bcryptjs';

import {
    validateHandleAdminEditUser,
    validateHandleAdminDeleteUser,
    validateHandleAdminDeletePost
} from '../controllers/validateAdminData.js';

let handleAdminEditUser = async (req, res) => {
    let { error } = validateHandleAdminEditUser(req.body);

    if (error) return res.status(400).json({ error });
};
