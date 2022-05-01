import jwt from 'jsonwebtoken';

export default function (req, res, next) {
    let token = req.headers['Authorization'];

    if (!token) return res.status(401).json({ error: 'Token não encontrado!' });
}
