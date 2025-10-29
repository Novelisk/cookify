import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import { validateSignup, validateSignin } from '../middlewares/validation.js';

const router = express.Router();

router.post('/signup', validateSignup, registerUser);
router.post('/signin', validateSignin, loginUser);

export default router;
