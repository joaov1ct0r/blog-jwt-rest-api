import {
  validateHandleNewUser,
  validateHandleUserLogin,
  validateHandleUserEdit,
  validateHandleOneUser
} from "../validators/validateUserData";

import User from "../database/models/userModel";

import Post from "../database/models/postModel";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import { Request, Response } from "express";

import IReq from "../types/requestInterface";

const handleNewUser = async (req: Request, res: Response) => {
  const { error } = validateHandleNewUser(req.body);

  if (error) return res.status(400).json({ error });

  const { email, password } = req.body;

  const isUserRegistered = await User.findOne({
    where: { email }
  });

  if (isUserRegistered) {
    return res.status(400).json({ error: "Usuario já cadastrado!" });
  };

  const newUser = await User.create({
    email,
    password: bcrypt.hashSync(password)
  });

  if (!newUser) {
    return res
      .status(500)
      .json({ error: "Falha ao cadastrar novo usuario!" });
  };

  return res.status(201).json(newUser);
};

const handleUserLogin = async (req: Request, res: Response) => {
  const { error } = validateHandleUserLogin(req.body);

  if (error) return res.status(400).json({ error });

  const { email, password } = req.body;

  const isUserRegistered = await User.findOne({
    where: { email }
  });

  if (!isUserRegistered) {
    return res.status(400).json({ error: "Usuario não encontrado!" });
  };

  const matchingPasswords = bcrypt.compareSync(
    password,
    isUserRegistered.password
  );

  if (!matchingPasswords) {
    return res.status(400).json({ error: "Falha na autenticação!" });
  };

  const token = jwt.sign(
    {
      id: isUserRegistered.id
    },
    process.env.JWT_TOKEN_SECRET as string,
    { expiresIn: 300 }
  );

  if (!token) {
    return res.status(500).json({ error: "Falha ao gerar token!" });
  };

  res.header("Authorization", `Bearer ${token}`);

  return res.status(200).json({
    message: "Login realizado com sucesso!"
  });
};

const handleEditUser = async (req: IReq, res: Response) => {
  const { error } = validateHandleUserEdit(req.body);

  if (error) return res.status(400).json({ error });

  const { email, password } = req.body;

  const id = req.userId;

  const editedUser = await User.update(
    {
      email,
      password: bcrypt.hashSync(password)
    },
    {
      where: { id }
    }
  );

  if (!editedUser) {
    return res
      .status(500)
      .json({ error: "Falha ao atualizar usuario!" });
  };

  return res.status(204).json({ message: "Usuario editado com sucesso!" });
};

const handleDeleteUser = async (req: IReq, res: Response) => {
  const id = req.userId;

  const deletedUser = await User.destroy({
    where: { id }
  });

  if (!deletedUser) {
    return res.status(500).json({ error: "Falha ao deletar usuario!" });
  };

  // eslint-disable-next-line no-unused-vars
  const deletedPosts = await Post.destroy({
    where: { userId: id }
  });

  return res.status(204).json({ message: "Usuario deletado com sucesso!" });
};

const handleAllUsers = async (req: Request, res: Response) => {
  const users = await User.findAll({
    include: Post
  });

  if (!users) {
    return res.status(500).json({ error: "Falha ao obter dados!" });
  };

  return res.status(200).json(users);
};

const handleOneUser = async (req: Request, res: Response) => {
  const { error } = validateHandleOneUser(req.body);

  if (error) return res.status(400).json({ error });

  const { email } = req.body;

  const isUserRegistered = await User.findOne({
    include: Post,
    where: { email }
  });

  if (!isUserRegistered) {
    return res.status(500).json({ error: "Usuario não encontrado!" });
  };

  return res.status(200).json(isUserRegistered);
};

export {
  handleNewUser,
  handleUserLogin,
  handleEditUser,
  handleDeleteUser,
  handleAllUsers,
  handleOneUser
};
