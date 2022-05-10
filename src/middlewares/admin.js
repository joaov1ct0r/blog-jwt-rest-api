import User from '../models/userModel.js';

export default async function (req, res, next) {
    let id = req.userId;

    let isUserRegistered = await User.findOne({
        where: { id }
    });

    if (!isUserRegistered)
        return res.status(400).json({ error: 'Usuario não encontrado!' });

    try {
        console.log(isUserRegistered.admin);
        let isUserAdmin = isUserRegistered.admin == '1' ? true : false;

        if (!isUserAdmin)
            return res.status(401).json({ error: 'Não autorizado!' });

        next();
    } catch (error) {
        throw error;
    }
}
