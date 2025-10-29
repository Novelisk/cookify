import express from 'express';
import {
  getUserProfile,
  addFavorite,
  removeFavorite,
} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';
import {
  validateFavoriteAdd,
  validateRecipeId,
} from '../middlewares/validation.js';

const router = express.Router();

router.get('/me', protect, getUserProfile);
router.post('/favorites', protect, validateFavoriteAdd, addFavorite);
router.delete(
  '/favorites/:recipeId',
  protect,
  validateRecipeId,
  removeFavorite
);

export default router;
