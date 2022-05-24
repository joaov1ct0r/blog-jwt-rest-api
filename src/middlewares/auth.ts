import jwt from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization!.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Token não encontrado!" });

  const verifiedToken = jwt.verify(token, String(process.env.JWT_TOKEN_SECRET));

  if (!verifiedToken) {
    return res.status(400).json({ error: "Falha na autenticação!" });
  }

  req.userId = verifiedToken.id;

  next();
}
