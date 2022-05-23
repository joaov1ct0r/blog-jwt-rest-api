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
    author: user!.email,
    title,
    description,
    content,
    userId: user!.id
  });

  if (!newPost) {
    return res
      .status(500)
      .json({ error: "Falha ao registrar novo Post" });
  };

  return res.status(200).json({ newPost });
};

const handleEditPost = async (req: Request, res: Response) => {
  const { error } = validateHandleEditPost(req.body);

  if (error) return res.status(400).json({ error });

  const { title, description, content, id } = req.body;

  const { userId } = req;

  const user = await User.findOne({
    where: { id: userId }
  });

  const isPostRegistered = await Post.findOne({
    where: { id }
  });

  if (!isPostRegistered) {
    return res.status(400).json({ error: "Post não encontrado!" });
  }

  const editedPost = await Post.update(
    {
      author: user!.email,
      title,
      description,
      content,
      userId: user!.id
    },
    {
      where: { id }
    }
  );

  if (!editedPost) {
    return res.status(500).json({ error: "Falha ao editar Post" });
  }

  return res.status(200).json({ message: "Post editado com sucesso!" });
};

const handleDeletePost = async (req: Request, res: Response) => {
  const { error } = validateHandleDeletePost(req.body);

  if (error) return res.status(400).json({ error });

  const { id } = req.body;

  const isPostRegistered = await Post.findOne({
    where: { id }
  });

  if (!isPostRegistered) {
    return res.status(400).json({ error: "Post não encontrado!" });
  }

  const deletedPost = await Post.destroy({
    where: { id }
  });

  if (!deletedPost) {
    return res.status(500).json({ error: "Falha ao deletar Post" });
  }

  return res.status(200).json({ message: "Post deletado com sucesso!" });
};

const handleAllPosts = async (req: Request, res: Response) => {
  const posts = await Post.findAll({});

  if (!posts) {
    return res.status(500).json({ error: "Falha ao obter dados!" });
  }

  return res.status(200).json({ posts });
};

const handleOnePost = async (req: Request, res: Response) => {
  const { error } = validateHandleOnePost(req.body);

  if (error) return res.status(400).json({ error });

  const { id } = req.body;

  const post = await Post.findOne({
    where: { id }
  });

  if (!post) {
    return res.status(400).json({ error: "Post não encontrado!" });
  }

  return res.status(200).json({ post });
};

export {
  handleNewPost,
  handleEditPost,
  handleDeletePost,
  handleAllPosts,
  handleOnePost
};
