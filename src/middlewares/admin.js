import User from '../models/userModel.js';

export default async function (req, res, next) {
    let { email } = req.body;

    if (!email)
        return res
            .status(400)
            .json({ error: 'Email não encontrado na requisição!' });

    let isUserRegistered = await User.findOne({
        where: { email }
    });

    if (!isUserRegistered)
        return res.status(400).json({ error: 'Usuario não encontrado!' });

    try {
        let isUserAdmin = isUserRegistered.admin == true ? true : false;

        if (!isUserAdmin)
            return res.status(401).json({ error: 'Não autorizado!' });

        next();
    } catch (error) {
        throw error;
    }
}
