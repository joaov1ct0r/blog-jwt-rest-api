import User from "../database/models/userModel";

import Post from "../database/models/postModel";

import bcrypt from "bcryptjs";

import { Request, Response } from "express";

import {
  validateHandleAdminEditUser,
  validateHandleAdminDeleteUser,
  validateHandleAdminDeletePost
} from "../validators/validateAdminData";

const handleAdminEditUser = async (req: Request, res: Response) => {
  const { error } = validateHandleAdminEditUser(req.body);

  if (error) return res.status(400).json({ error });

  const { userEmail, userNewEmail, userNewPassword } = req.body;

  const isUserRegistered = await User.findOne({
    where: { email: userEmail }
  });

  if (!isUserRegistered) {
    return res.status(404).json({ error: "Usuario não encontrado!" });
  };

  const editedUser = await User.update(
    {
      email: userNewEmail,
      password: bcrypt.hashSync(userNewPassword)
    },
    {
      where: { email: userEmail }
    }
  );

  if (!editedUser) {
    return res
      .status(500)
      .json({ error: "Falha ao atualizar usuario!" });
  };

  return res.status(204).send();
};

const handleAdminDeleteUser = async (req: Request, res: Response) => {
  const { error } = validateHandleAdminDeleteUser(req.body);

  if (error) return res.status(400).json({ error });

  const { userEmail } = req.body;

  const isUserRegistered = await User.findOne({
    where: { email: userEmail }
  });

  if (!isUserRegistered) {
    return res.status(404).json({ error: "Usuario não encontrado!" });
  };

  const deletedUser = await User.destroy({
    where: { email: userEmail }
  });

  if (!deletedUser) {
    return res.status(500).json({ error: "Falha ao deletar usuario!" });
  };

  // eslint-disable-next-line no-unused-vars
  const deletedPosts = await Post.destroy({
    where: { userId: isUserRegistered.id }
  });

  return res.status(204).send();
};

const handleAdminDeletePost = async (req: Request, res: Response) => {
  const { error } = validateHandleAdminDeletePost(req.body);

  if (error) return res.status(400).json({ error });

  const { id } = req.body;

  const isPostRegistered = await Post.findOne({
    where: { id }
  });

  if (!isPostRegistered) {
    return res.status(404).json({ error: "Post não encontrado!" });
  };

  const deletedPost = await Post.destroy({
    where: { id }
  });

  if (!deletedPost) {
    return res.status(500).json({ error: "Falha ao deletar post!" });
  }

  return res.status(204).send();
};

export { handleAdminEditUser, handleAdminDeleteUser, handleAdminDeletePost };
