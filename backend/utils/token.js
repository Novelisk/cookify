import jwt from 'jsonwebtoken';

const token = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

export default token;
