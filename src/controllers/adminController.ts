import User from "../database/models/userModel";

import Post from "../database/models/postModel";

import bcrypt from 'bcryptjs';

import {
  validateHandleAdminEditUser,
  validateHandleAdminDeleteUser,
  validateHandleAdminDeletePost
} from './validateAdminData.js';

let handleAdminEditUser = async (req, res) => {
  let { error } = validateHandleAdminEditUser(req.body);

  if (error) return res.status(400).json({ error });

  let { userEmail, userNewEmail, userNewPassword } = req.body;

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
