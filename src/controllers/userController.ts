import {
  validateHandleNewUser,
  validateHandleUserLogin,
  validateHandleUserEdit,
  validateHandleOneUser
} from "./validateUserData.js";

import User from "../database/models/userModel.js";

import Post from "../database/models/postModel.js";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import { Request, Response } from "express";

const handleNewUser = async (req: Request, res: Response) => {
  const { error } = validateHandleNewUser(req.body);

  if (error) return res.status(400).json({ error });

  const { email, password } = req.body;

  const isUserRegistered = await User.findOne({
    where: { email }
  });

  if (isUserRegistered) {
    return res.status(400).json({ error: "Usuario já cadastrado!" });
  }

  const newUser = await User.create({
    email,
    password: bcrypt.hashSync(password)
  });

  if (!newUser) {
    return res
      .status(500)
      .json({ error: "Falha ao cadastrar novo usuario!" });
  }

  res.status(201).json(newUser);
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
    isUserRegistered.password
  );

  if (!matchingPasswords)
    return res.status(400).json({ error: 'Falha na autenticação!' });

  try {
    let token = jwt.sign(
      {
        id: isUserRegistered.id
      },
      process.env.JWT_TOKEN_SECRET,
      { expiresIn: 300 }
    );

    if (!token)
      return res.status(500).json({ error: 'Falha ao gerar token!' });

    res.header('Authorization', `Bearer ${token}`);

    res.status(200).json({
      message: 'Login realizado com sucesso!'
    });
  } catch (error) {
    throw error;
  }
};

let handleEditUser = async (req, res) => {
  let { error } = validateHandleUserEdit(req.body);

  if (error) return res.status(400).json({ error });

  let { email, password } = req.body;

  let id = req.userId;

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

    res.status(204).json({ message: 'Usuario editado com sucesso!' });
  } catch (error) {
    throw error;
  }
};

let handleDeleteUser = async (req, res) => {
  let id = req.userId;

  try {
    let deletedUser = await User.destroy({
      where: { id }
    });

    if (!deletedUser)
      return res.status(500).json({ error: 'Falha ao deletar usuario!' });

    let deletedPosts = await Post.destroy({
      where: { userId: id }
    });

    res.status(204).json({ message: 'Usuario deletado com sucesso!' });
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

    res.status(200).json(users);
  } catch (error) {
    throw error;
  }
};

let handleOneUser = async (req, res) => {
  let { error } = validateHandleOneUser(req.body);

  if (error) return res.status(400).json({ error });

  let { email } = req.body;

  try {
    let isUserRegistered = await User.findOne({
      include: Post,
      where: { email }
    });

    if (!isUserRegistered)
      return res.status(500).json({ error: 'Usuario não encontrado!' });

    res.status(200).json(isUserRegistered);
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
