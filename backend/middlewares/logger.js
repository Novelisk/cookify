import expressWinston from 'express-winston';
import winston from 'winston';

export const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: 'logs/request.log',
    }),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
});

export const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: 'logs/error.log',
    }),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
});
