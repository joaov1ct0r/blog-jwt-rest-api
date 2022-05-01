import User from '../models/userModel.js';

export default function (req, res, next) {
  let registeredUser = await User.findOne({
    where: { email: req.body.email }
  });

  if(!registeredUser) return res.status(400).json({error: 'Usuario não encontrado'});
}