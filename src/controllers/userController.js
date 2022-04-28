import { validateNewUser } from './validateUserData.js';

import User from '../models/userModel.js';

import bcrypt from 'bcryptjs';

let handleNewUser = async (req, res) => {
    let { error } = validateNewUser(req.body);

    if (error) return res.status(400).json({ error });

    let { email, password } = req.body;

    let registeredUser = await User.findOne({
        where: { email }
    });

    if (!registeredUser)
        return res.status(400).json({ error: 'Usuario já cadastrado!' });
};
