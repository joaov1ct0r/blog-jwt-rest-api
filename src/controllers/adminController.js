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

    let { email, password, userEmail, userNewEmail, userNewPassword } =
        req.body;

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

    let isUserRegistered = await User.findOne({
        where: { email: userEmail }
    });

    if (!isUserRegistered)
        return res.status(400).json({ error: 'Usuario não encontrado!' });

    try {
        let editedUser = await User.update(
            {
                email: userNewEmail,
                password: bcrypt.hashSync(userNewPassword)
            },
            {
                where: { userEmail }
            }
        );

        if (!editedUser)
            return res
                .status(500)
                .json({ error: 'Falha ao atualizar usuario!' });

        res.status(200).json({ message: 'Usuario editado com sucesso!' });
    } catch (error) {
        throw error;
    }
};

let handleAdminDeleteUser = async (req, res) => {
    let { error } = validateHandleAdminDeleteUser(req.body);

    if (error) return res.status(400).json({ error });

    let { email, password, userEmail } = req.body;

    let isAdminRegistered = await User.findOne({
        where: { email }
    });

    if (!isAdminRegistered)
        return res.status(400).json({ error: 'Falha na autenticação!' });

    let matchingPasswords = await bcrypt.hashSync(
        password,
        isAdminRegistered.password
    );

    if (!matchingPasswords)
        return res.status(401).json({ error: 'Não autorizado!' });

    let isUserRegistered = await User.findOne({
        where: { email: userEmail }
    });

    if (!isUserRegistered)
        return res.status(400).json({ error: 'Usuario não encontrado!' });

    try {
        let deletedUser = await User.destroy({
            where: { email: userEmail }
        });

        if (!deletedUser)
            return res.status(500).json({ error: 'Falha ao deletar usuario!' });

        let deletedPosts = await Post.destroy({
            where: { userId: isUserRegistered.id }
        });

        res.status(200).json({ message: 'Usuario deletado com sucesso!' });
    } catch (error) {
        throw error;
    }
};

let handleAdminDeletePost = async (req, res) => {
    let { error } = validateHandleAdminDeletePost(req.body);

    if (error) return res.status(400).json({ error });
};

export { handleAdminEditUser, handleAdminDeleteUser };
