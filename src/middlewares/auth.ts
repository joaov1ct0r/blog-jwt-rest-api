import jwt from "jsonwebtoken";

export default function (req, res, next) {
  let token = req.headers['authorization'].split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Token não encontrado!' });

  try {
    let verifiedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

    if (!verifiedToken)
      return res.status(400).json({ error: 'Falha na autenticação!' });

    req.userId = verifiedToken.id;
    next();
  } catch (error) {
    throw error;
  }
}
