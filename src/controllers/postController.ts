import User from "../database/models/userModel";

import Post from "../database/models/postModel";

import { Request, Response } from "express";

import IReq from "../types/requestInterface";

import {
  validateHandleNewPost,
  validateHandleEditPost,
  validateHandleDeletePost,
  validateHandleOnePost
} from "../validators/validatePostData";

import IUser from "../types/userInterface";

import { Model } from "sequelize";

const handleNewPost = async (req: IReq, res: Response): Promise<Response<any, Record<string, any>>> => {
  const { error } = validateHandleNewPost(req.body);

  if (error) return res.status(400).json({ error });

  const title: string = req.body.title;

  const description: string = req.body.description;

  const content: string = req.body.content;

  const id: string | undefined = req.userId;

  try {
    const user: IUser | null = await User.findOne({
      where: { id }
    });

    const newPost: Model<any, any> = await Post.create({
      author: user!.email,
      title,
      description,
      content,
      userId: user!.id
    });

    return res.status(201).json({ newPost });
  } catch (err: unknown) {
    return res.status(500).json({ err });
  }
};

const handleEditPost = async (req: IReq, res: Response): Promise<Response<any, Record<string, any>>> => {
  const { error } = validateHandleEditPost(req.body);

  if (error) return res.status(400).json({ error });

  const title: string = req.body.title;

  const description: string = req.body.description;

  const content: string = req.body.content;

  const id: string = req.body.id;

  const userId: string | undefined = req.userId;

  try {
    const user: IUser | null = await User.findOne({
      where: { id: userId }
    });

    const isPostRegistered: Model<any, any> | null = await Post.findOne({
      where: { id }
    });

    if (isPostRegistered === null) {
      return res.status(404).json({ error: "Post não encontrado!" });
    };

    const editedPost: [affectedCount: number] = await Post.update(
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

    if (editedPost[0] === 0) {
      return res.status(500).json({ error: "Falha ao editar Post" });
    };

    return res.status(204).send();
  } catch (err: unknown) {
    return res.status(500).json({ err });
  };
};

const handleDeletePost = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  const { error } = validateHandleDeletePost(req.body);

  if (error) return res.status(400).json({ error });

  const id: string = req.body.id;

  try {
    const isPostRegistered = await Post.findOne({
      where: { id }
    });

    if (isPostRegistered === null) {
      return res.status(404).json({ error: "Post não encontrado!" });
    };

    const deletedPost = await Post.destroy({
      where: { id }
    });

    if (deletedPost === 0) {
      return res.status(500).json({ error: "Falha ao deletar Post" });
    };

    return res.status(204).send();
  } catch (err: unknown) {
    return res.status(500).json({ err });
  }
};

const handleAllPosts = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const posts: Model<any, any>[] = await Post.findAll({});

    return res.status(200).json({ posts });
  } catch (err: unknown) {
    return res.status(500).json({ err });
  };
};

const handleOnePost = async (req: Request, res: Response) => {
  const { error } = validateHandleOnePost(req.body);

  if (error) return res.status(400).json({ error });

  const id: string = req.body.id;

  try {
    const post: Model<any, any> | null = await Post.findOne({
      where: { id }
    });

    if (post === null) {
      return res.status(404).json({ error: "Post não encontrado!" });
    };

    return res.status(200).json({ post });
  } catch (err: unknown) {
    return res.status(500).json({ err });
  }
};

export {
  handleNewPost,
  handleEditPost,
  handleDeletePost,
  handleAllPosts,
  handleOnePost
};
