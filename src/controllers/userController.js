import { validateNewUser } from './validateUserData.js';

let handleNewUser = async (req, res) => {
    let { error } = validateNewUser(req.body);

    if (error) return res.status(400).json({ error });
};
