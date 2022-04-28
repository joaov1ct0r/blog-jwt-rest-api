import { validateUserData } from './validateUserData.js';

import User from '../models/userModel.js';

import bcrypt from 'bcryptjs';

let handleNewUser = async (req, res) => {
    let { error } = validateUserData(req.body);

    if (error) return res.status(400).json({ error });

    let { email, password } = req.body;

    let registeredUser = await User.findOne({
        where: { email }
    });

    if (!registeredUser)
        return res.status(400).json({ error: 'Usuario já cadastrado!' });

    try {
        let newUser = await User.create({
            email,
            password: bcrypt.hashSync(password)
        });

        if (!newUser)
            return res
                .status(500)
                .json({ error: 'Falha ao cadastrar novo usuario!' });

        res.status(200).json({ message: 'Usuario cadastrado com sucesso!' });
    } catch (error) {
        throw error;
    }
};

let handleUserLogin = async (req, res) => {
    let { error } = validateUserData(req.body);

    if (error) return res.status(400).json({ error });
};

export { handleNewUser };
