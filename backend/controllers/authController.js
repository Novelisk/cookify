import User from '../models/User.js';
import token from '../utils/token.js';
import bcrypt from 'bcryptjs';

export const registerUser = async (req, res, next) => {
  try {
    console.log('Datos recibidos en backend:', req.body);
    const { name, email, password } = req.body;

    const rawName = name || '';
    const [firstName, ...rest] = rawName.trim().split(' ');
    const lastName = rest.join(' ') || '';

    console.log('Parsed:', { firstName, lastName, email });

    const userExists = await User.findOne({ email });

    if (userExists)
      return res
        .status(400)
        .send({ message: 'El usuario que intenta ingresar ya existe.' });

    const hashPass = await bcrypt.hash(password, 10);
    console.log('Password hasheada correctamente');

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashPass,
    });

    console.log('Usuario creado:', user._id);

    res.status(201).send({
      token: token(user._id),
      user: {
        _id: user.id,
        name: `${user.firstName} ${user.lastName}`.trim(),
        email: user.email,
        token: token(user._id),
      },
    });
  } catch (error) {
    console.log('Error en registerUser:', error);
    res.status(500).send({ message: 'Error interno al registrar usuario.' });
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).send({ message: 'Usuario no encontrado.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).send({ message: 'Credenciales inválidas.' });

    res.json({
      token: token(user._id),
      user: {
        id: user._id,
        name: `${user.firstName} ${user.lastName}`.trim(),
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).send({ message: 'Error interno al iniciar sesión.' });
    next(error);
  }
};
