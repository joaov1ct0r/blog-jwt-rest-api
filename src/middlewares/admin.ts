import User from "../database/models/userModel";

import { Request, Response, NextFunction } from "express";

export default async function (req, res, next) {
  let id = req.userId;

  let isUserRegistered = await User.findOne({
    where: { id }
  });

  if (!isUserRegistered)
    return res.status(400).json({ error: 'Usuario não encontrado!' });

  try {
    let isUserAdmin = isUserRegistered.admin === true ? true : false;

    if (!isUserAdmin)
      return res.status(401).json({ error: 'Não autorizado!' });

    next();
  } catch (error) {
    throw error;
  }
}
