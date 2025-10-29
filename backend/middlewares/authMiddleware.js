import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  const reqAuth = req.headers.authorization;
  let token;
  if (reqAuth && reqAuth.startsWith('Bearer')) {
    try {
      token = reqAuth.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (err) {
      res.status(401).send({ message: 'Token inválido o expirado.' });
    }
  }
  if (!token) res.status(401).send({ message: 'No tiene autorización.' });
};
