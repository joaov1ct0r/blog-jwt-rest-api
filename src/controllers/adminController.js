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

    let { userEmail, userNewEmail, userNewPassword } = req.body;

    let id = req.userId;

    let isAdminRegistered = await User.findOne({
        where: { id }
    });

    if (!isAdminRegistered)
        return res.status(400).json({ error: 'Falha na autenticação!' });

    let isAdminAdmin = isAdminRegistered.admin === true ? true : false;

    if (!isAdminAdmin)
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
                where: { email: userEmail }
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

    let { userEmail } = req.body;

    let id = req.userId;

    let isAdminRegistered = await User.findOne({
        where: { id }
    });

    if (!isAdminRegistered)
        return res.status(400).json({ error: 'Falha na autenticação!' });

    let isAdminAdmin = isAdminRegistered.admin === true ? true : false;

    if (!isAdminAdmin)
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

    let { id } = req.body;

    let { userId } = req;

    let isAdminRegistered = await User.findOne({
        where: { id: userId }
    });

    if (!isAdminRegistered)
        return res.status(400).json({ error: 'Usuario não encontrado!' });

    let isAdminAdmin = isAdminRegistered.admin === true ? true : false;

    if (!isAdminAdmin)
        return res.status(401).json({ error: 'Não autorizado!' });

    let isPostRegistered = await Post.findOne({
        where: { id }
    });

    if (!isPostRegistered)
        return res.status(400).json({ error: 'Post não encontrado!' });

    try {
        let deletedPost = await Post.destroy({
            where: { id }
        });

        if (!deletedPost)
            return res.status(500).json({ error: 'Falha ao deletar post!' });

        res.status(200).json({ message: 'Post deletado com sucesso!' });
    } catch (error) {
        throw error;
    }
};

export { handleAdminEditUser, handleAdminDeleteUser, handleAdminDeletePost };
