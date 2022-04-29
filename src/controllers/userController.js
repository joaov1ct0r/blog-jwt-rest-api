import { validateUserData } from './validateUserData.js';

import User from '../models/userModel.js';

import Post from '../models/postModel.js';

import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

let handleNewUser = async (req, res) => {
    let { error } = validateUserData(req.body);

    if (error) return res.status(400).json({ error });

    let { email, password } = req.body;

    let registeredUser = await User.findOne({
        where: { email }
    });

    if (registeredUser)
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

    let { email, password } = req.body;

    let registeredUser = await User.findOne({
        where: { email }
    });

    if (!registeredUser)
        return res.status(400).json({ error: 'Usuario não encontrado!' });

    let comparedPassword = bcrypt.compareSync(
        password,
        registeredUser.password
    );

    if (!comparedPassword)
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

        res.set('auth', token);

        res.status(200).json({ message: 'Login realizado com sucesso!' });
    } catch (error) {
        throw error;
    }
};

let handleEditUser = async (req, res) => {
    let { error } = validateUserData(req.body);

    if (error) return res.status(400).json({ error });

    let { id } = req.params;

    let { email, password } = req.body;

    let registeredUser = await User.findOne({
        where: { email }
    });

    if (!registeredUser)
        return res.status(400).json({ error: 'Usuario não encontrado!' });

    try {
        let editedUser = await User.update(
            {
                email,
                password: bcrypt.hashSync(password)
            },
            {
                where: { id }
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
    let { id } = req.params;

    let registeredUser = await User.findOne({
        where: { email }
    });

    if (!registeredUser)
        return res.status(400).json({ error: 'Usuario não encontrado!' });

    try {
        let deletedUser = await User.destroy({
            where: { id }
        });

        if (!deletedUser)
            return res.status(500).json({ error: 'Falha ao deletar usuario!' });

        let deletedPosts = await Post.destroy({
            where: { userId: id }
        });

        res.status(200).json({ message: 'Usuario deletado com sucesso!' });
    } catch (error) {
        throw error;
    }
};

let handleAllUsers = async (req, res) => {
    try {
        let users = await User.findAll({});

        if (!users)
            return res.status(500).json({ error: 'Falha ao obter dados!' });
    } catch (error) {
        throw error;
    }
};

export { handleNewUser, handleUserLogin, handleEditUser, handleDeleteUser };
