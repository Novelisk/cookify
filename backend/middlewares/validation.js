import { celebrate, Joi, Segments } from 'celebrate';

export const validateSignup = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(60).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
});

export const validateSignin = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export const validateUserProfile = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
});

export const validateFavoriteAdd = celebrate({
  [Segments.BODY]: Joi.object().keys({
    recipeId: Joi.string().required(),
    recipeName: Joi.string().required(),
    recipeThumb: Joi.string().uri().required(),
    recipeLink: Joi.string().uri().allow('').optional(),
  }),
});

export const validateRecipeId = celebrate({
  [Segments.BODY]: Joi.object().keys({
    recipeId: Joi.string().required(),
  }),
});
