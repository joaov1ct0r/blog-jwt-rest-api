import User from '../models/userModel.js';

import Post from '../models/postModel.js';

import {
    validateHandleNewPost,
    validateHandleEditPost
} from './validatePostData.js';

let handleNewPost = async (req, res) => {
    let { error } = validateHandleNewPost(req.body);

    if (error) return res.status(400).json({ error });

    let { email, title, description } = req.body;

    let isUserRegistered = await User.findOne({
        where: { email }
    });

    if (!isUserRegistered)
        return res.status(400).json({ error: 'Usuario não encontrado!' });

    try {
        let newPost = await Post.create({
            author: email,
            title,
            description,
            userId: isUserRegistered.id
        });

        if (!newPost)
            return res
                .status(500)
                .json({ error: 'Falha ao registrar novo Post' });

        res.status(200).json({ newPost });
    } catch (error) {
        throw error;
    }
};

let handleEditPost = async (req, res) => {
    let { error } = validateHandleEditPost(req.body);

    if (error) return res.status(400).json({ error });

    let isUserRegistered = await User.findOne({
        where: { email }
    });

    if (!isUserRegistered)
        return res.status(400).json({ error: 'Usuario não encontrado!' });
};

export { handleNewPost };
