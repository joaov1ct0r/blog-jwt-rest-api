import User from '../models/userModel.js';

export default function (req, res, next) {
  let isUserRegistered = await User.findOne({
    where: { email: req.body.email }
  });

  if(!isUserRegistered) return res.status(400).json({error: 'Usuario não encontrado!'});

  try {
    let isUserAdmin = isUserRegistered.admin === true ? true : false;
    
    if(!isUserAdmin) return res.status(401).json({error: 'Não autorizado!'})

    next()
  } catch (error) {
    throw error;
  }
}