import { validateNewUser } from './validateUserData.js';

import User from '../models/userModel.js';

import bcrypt from 'bcryptjs';

let handleNewUser = async (req, res) => {
    let { error } = validateNewUser(req.body);

    if (error) return res.status(400).json({ error });
};
