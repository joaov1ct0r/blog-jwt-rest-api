import User from '../models/userModel.js';

import Post from '../models/postModel.js';

import { validateHandleNewPost } from './validatePostData.js';

let handleNewPost = async (req, res) => {
    let { error } = validateHandleNewPost(req.body);

    if (error) return res.status(400).json({ error });
};
