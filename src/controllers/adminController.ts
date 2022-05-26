import User from "../database/models/userModel";

import Post from "../database/models/postModel";

import bcrypt from "bcryptjs";

import { Request, Response } from "express";

import {
  validateHandleAdminEditUser,
  validateHandleAdminDeleteUser,
  validateHandleAdminDeletePost
} from "../validators/validateAdminData";

import IUser from "../types/userInterface";

import { Model } from "sequelize";

const handleAdminEditUser = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  const { error } = validateHandleAdminEditUser(req.body);

  if (error) return res.status(400).json({ error });

  const userEmail: string = req.body.userEmail;

  const userNewEmail: string = req.body.userNewEmail;

  const userNewPassword: string = req.body.userNewPassword;

  try {
    const isUserRegistered: IUser | null = await User.findOne({
      where: { email: userEmail }
    });

    if (isUserRegistered === null) {
      return res.status(404).json({ error: "Usuario não encontrado!" });
    };

    const editedUser: [affectedCount: number] = await User.update(
      {
        email: userNewEmail,
        password: bcrypt.hashSync(userNewPassword)
      },
      {
        where: { email: userEmail }
      }
    );

    if (editedUser[0] === 0) {
      return res
        .status(500)
        .json({ error: "Falha ao atualizar usuario!" });
    };

    return res.status(204).send();
  } catch (err: unknown) {
    return res.status(500).json({ err });
  }
};

const handleAdminDeleteUser = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  const { error } = validateHandleAdminDeleteUser(req.body);

  if (error) return res.status(400).json({ error });

  const userEmail: string = req.body.userEmail;

  try {
    const isUserRegistered: IUser | null = await User.findOne({
      where: { email: userEmail }
    });

    if (isUserRegistered === null) {
      return res.status(404).json({ error: "Usuario não encontrado!" });
    };

    const deletedUser: number = await User.destroy({
      where: { email: userEmail }
    });

    if (deletedUser === 0) {
      return res.status(500).json({ error: "Falha ao deletar usuario!" });
    };

    // eslint-disable-next-line no-unused-vars
    const deletedPosts: number = await Post.destroy({
      where: { userId: isUserRegistered.id }
    });

    return res.status(204).send();
  } catch (err: unknown) {
    return res.status(500).json({ err });
  };
};

const handleAdminDeletePost = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  const { error } = validateHandleAdminDeletePost(req.body);

  if (error) return res.status(400).json({ error });

  const id: string = req.body.id;

  try {
    const isPostRegistered: Model<any, any> | null = await Post.findOne({
      where: { id }
    });

    if (isPostRegistered === null) {
      return res.status(404).json({ error: "Post não encontrado!" });
    };

    const deletedPost: number = await Post.destroy({
      where: { id }
    });

    if (deletedPost === 0) {
      return res.status(500).json({ error: "Falha ao deletar post!" });
    }

    return res.status(204).send();
  } catch (err: unknown) {
    return res.status(500).json({ err });
  };
};

export { handleAdminEditUser, handleAdminDeleteUser, handleAdminDeletePost };
