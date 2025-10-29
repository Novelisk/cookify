import { isCelebrateError } from 'celebrate';

export const errorHandler = (err, req, res, next) => {
  console.error(`Error: ${err.message}`);

  if (isCelebrateError(err)) {
    const validationError = [];
    for (const [, error] of err.details.entries()) {
      validationError.push(error.message);
    }
    return res.status(400).json({
      status: 400,
      message: validationError.join(', ') || 'Datos inválidos enviados.',
    });
  }

  if (err.name === 'MongoError' || err.code === 11000) {
    return res.status(409).json({
      status: 409,
      message: 'El recurso ya existe (duplicado en la base de datos).',
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      status: 400,
      message: 'El formato del identificador proporcionado no es válido.',
    });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      status: 401,
      message: 'Token inválido o no proporcionado.',
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      status: 401,
      message: 'El token ha expirado, inicia sesión nuevamente.',
    });
  }

  if (err.name === 'ForbiddenError') {
    return res.status(403).json({
      status: 403,
      message: 'No tienes permisos para realizar esta acción.',
    });
  }

  if (err.statusCode) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    });
  }

  const statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  return res.status(statusCode).json({
    status: statusCode,
    message: err.message || 'Error interno del servidor.',
  });
};
