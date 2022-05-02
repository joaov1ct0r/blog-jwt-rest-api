import {
    validateHandleNewUser,
    validateHandleUserLogin,
    validateHandleUserEdit,
    validateHandleDeleteUser
} from './validateUserData.js';

import User from '../models/userModel.js';

import Post from '../models/postModel.js';

import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

let handleNewUser = async (req, res) => {
    let { error } = validateHandleNewUser(req.body);

    if (error) return res.status(400).json({ error });

    let { email, password } = req.body;

    let isUserRegistered = await User.findOne({
        where: { email }
    });

    if (isUserRegistered)
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
    let { error } = validateHandleUserLogin(req.body);

    if (error) return res.status(400).json({ error });

    let { email, password } = req.body;

    let isUserRegistered = await User.findOne({
        where: { email }
    });

    if (!isUserRegistered)
        return res.status(400).json({ error: 'Usuario não encontrado!' });

    let matchingPasswords = bcrypt.compareSync(
        password,
        registeredUser.password
    );

    if (!matchingPasswords)
        return res.status(400).json({ error: 'Falha na autenticação!' });

    try {
        let token = jwt.sign(
            {
                id: registeredUser.id
            },
            process.env.JWT_TOKEN_SECRET
        );

        if (!token)
            return res.status(500).json({ error: 'Falha ao gerar token!' });

        res.header('Authorization', 'Bearer ' + token);

        res.status(200).json({ message: 'Login realizado com sucesso!' });
    } catch (error) {
        throw error;
    }
};

let handleEditUser = async (req, res) => {
    let { error } = validateHandleUserEdit(req.body);

    if (error) return res.status(400).json({ error });

    let { email, newEmail, newPassword } = req.body;

    let isUserRegistered = await User.findOne({
        where: { email }
    });

    if (!isUserRegistered)
        return res.status(400).json({ error: 'Usuario não encontrado!' });

    try {
        let editedUser = await User.update(
            {
                email: newEmail,
                password: bcrypt.hashSync(newPassword)
            },
            {
                where: { email }
            }
        );

        if (!editedUser)
            return res
                .status(500)
                .json({ error: 'Falha ao atualizar usuario!' });

        res.status(200).json({ message: 'Usuario atualizado com sucesso!' });
    } catch (error) {
        throw error;
    }
};

let handleDeleteUser = async (req, res) => {
    let { error } = validateHandleDeleteUser(req.body);

    if (!error) return res.status(400).json({ error });

    let { email } = req.body;

    let isUserRegistered = await User.findOne({
        where: { email }
    });

    if (!isUserRegistered)
        return res.status(400).json({ error: 'Usuario não encontrado!' });

    try {
        let deletedUser = await User.destroy({
            where: { email }
        });

        if (!deletedUser)
            return res.status(500).json({ error: 'Falha ao deletar usuario!' });

        let deletedPosts = await Post.destroy({
            where: { userId: registeredUser.id }
        });

        res.status(200).json({ message: 'Usuario deletado com sucesso!' });
    } catch (error) {
        throw error;
    }
};

let handleAllUsers = async (req, res) => {
    try {
        let users = await User.findAll({
            include: Post
        });

        if (!users)
            return res.status(500).json({ error: 'Falha ao obter dados!' });

        res.status(200).json({ users });
    } catch (error) {
        throw error;
    }
};

let handleOneUser = async (req, res) => {
    let { email } = req.body;

    if (!email)
        return res
            .status(400)
            .json({ error: 'Email não encontrado na requisição!' });

    try {
        let isUserRegistered = await User.findOne({
            include: Post,
            where: { email }
        });

        if (!isUserRegistered)
            return res.status(500).json({ error: 'Usuario não encontrado!' });

        res.status(200).json({ isUserRegistered });
    } catch (error) {
        throw error;
    }
};

export {
    handleNewUser,
    handleUserLogin,
    handleEditUser,
    handleDeleteUser,
    handleAllUsers,
    handleOneUser
};
