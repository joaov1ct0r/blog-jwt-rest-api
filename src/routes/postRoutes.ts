import express from "express";

import {
  handleNewPost,
  handleEditPost,
  handleDeletePost,
  handleAllPosts,
  handleOnePost
} from "../controllers/postController";

import auth from "../middlewares/auth";

const postRouter: express.Router = express.Router();

postRouter.post("/register", auth, handleNewPost);

postRouter.put("/edit", auth, handleEditPost);

postRouter.delete("/delete", auth, handleDeletePost);

postRouter.get("/posts", auth, handleAllPosts);

postRouter.get("/post", auth, handleOnePost);

export default postRouter;
