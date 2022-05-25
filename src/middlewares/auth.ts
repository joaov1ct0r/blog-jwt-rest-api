import jwt from "jsonwebtoken";

import IJwt from "../types/jsonInterface";

import { Response, NextFunction } from "express";

import IReq from "../types/requestInterface";

export default function (req: IReq, res: Response, next: NextFunction) {
  const token = req.headers.authorization!.split(" ")[1];

  if (!token) return res.status(400).json({ error: "Token não encontrado!" });

  const verifiedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET as string) as IJwt;

  if (!verifiedToken) {
    return res.status(401).json({ error: "Falha na autenticação!" });
  }

  req.userId = verifiedToken.id;

  next();
}
