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

    let { email, password, userEmail, userPassword } = req.body;

    let isAdminRegistered = await User.findOne({
        where: { email }
    });

    if (!isAdminRegistered)
        return res.status(400).json({ error: 'Falha na autenticação!' });

    let matchingPasswords = bcrypt.compareSync(
        password,
        isAdminRegistered.password
    );

    if (!matchingPasswords)
        return res.status(401).json({ error: 'Não autorizado!' });
};
