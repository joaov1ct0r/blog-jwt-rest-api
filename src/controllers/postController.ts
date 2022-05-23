import User from "../database/models/userModel";

import Post from "../database/models/postModel";

import { Request, Response } from "express";

import {
  validateHandleNewPost,
  validateHandleEditPost,
  validateHandleDeletePost,
  validateHandleOnePost
} from "./validatePostData";

const handleNewPost = async (req: Request, res: Response) => {
  const { error } = validateHandleNewPost(req.body);

  if (error) return res.status(400).json({ error });

  const { title, description, content } = req.body;

  const id = req.userId;

  const user = await User.findOne({
    where: { id }
  });

  const newPost = await Post.create({
    author: user.email,
    title,
    description,
    content,
    userId: user.id
  });

  if (!newPost) {
    return res
      .status(500)
      .json({ error: "Falha ao registrar novo Post" });
  }

  return res.status(200).json({ newPost });
};

let handleEditPost = async (req, res) => {
  let { error } = validateHandleEditPost(req.body);

  if (error) return res.status(400).json({ error });

  let { title, description, content, id } = req.body;

  let { userId } = req;

  let user = await User.findOne({
    where: { id: userId }
  });

  let isPostRegistered = await Post.findOne({
    where: { id }
  });

  if (!isPostRegistered)
    return res.status(400).json({ error: 'Post não encontrado!' });

  try {
    let editedPost = await Post.update(
      {
        author: user.email,
        title,
        description,
        content,
        userId: user.id
      },
      {
        where: { id }
      }
    );

    if (!editedPost)
      return res.status(500).json({ error: 'Falha ao editar Post' });

    res.status(200).json({ message: 'Post editado com sucesso!' });
  } catch (error) {
    throw error;
  }
};

let handleDeletePost = async (req, res) => {
  let { error } = validateHandleDeletePost(req.body);

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
      return res.status(500).json({ error: 'Falha ao deletar Post' });

    res.status(200).json({ message: 'Post deletado com sucesso!' });
  } catch (error) {
    throw error;
  }
};

let handleAllPosts = async (req, res) => {
  try {
    let posts = await Post.findAll({});

    if (!posts)
      return res.status(500).json({ error: 'Falha ao obter dados!' });

    res.status(200).json({ posts });
  } catch (error) {
    throw error;
  }
};

let handleOnePost = async (req, res) => {
  let { error } = validateHandleOnePost(req.body);

  if (error) return res.status(400).json({ error });

  let { id } = req.body;

  try {
    let post = await Post.findOne({
      where: { id }
    });

    if (!post)
      return res.status(400).json({ error: 'Post não encontrado!' });

    res.status(200).json({ post });
  } catch (error) {
    throw error;
  }
};

export {
  handleNewPost,
  handleEditPost,
  handleDeletePost,
  handleAllPosts,
  handleOnePost
};
