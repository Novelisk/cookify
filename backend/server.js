import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import cors from 'cors';
import { errors } from 'celebrate';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';

dotenv.config();
connectDB();

const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

const allowedOrigins = [
  'http://localhost:5173',
  'https://localhost:5173',
  'http://127.0.0.1:5173',
  process.env.FRONTEND_URL,
  'https://cookify-api.onrender.com', // Cambiar por el dominio de Render
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error(`Bloqueado por CORS: ${origin}.`);
        callback(new Error('CORS not allowed for this origin.'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'Content-Type', 'Accept', 'Origin'],
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    message: 'Demasiadas solicitudes. Inténtelo de nuevo más tarde.',
  },
});

app.use(limiter);

app.use(requestLogger);

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => res.send('Cookify backend OK'));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok ' });
});

app.use((req, res, next) => {
  console.log('Ruta no encontrada:', req.method, req.originalUrl);
  res.status(404).send({ message: 'Esta ruta no existe.' });
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening at port: ${PORT}`));
