import User from "../database/models/userModel";

import { Response, NextFunction } from "express";

import IReq from "../types/requestInterface";

export default async function (req: Request, res: Response, next: NextFunction) {
  const id = req.userId;

  const isUserRegistered = await User.findOne({
    where: { id }
  });

  if (!isUserRegistered) {
    return res.status(400).json({ error: "Usuario não encontrado!" });
  }

  const isUserAdmin = isUserRegistered.admin === true;

  if (!isUserAdmin) {
    return res.status(401).json({ error: "Não autorizado!" });
  }

  next();
}
