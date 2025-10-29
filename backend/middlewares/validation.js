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
    title: Joi.string().required(),
    image: Joi.string().uri().required(),
    apiLink: Joi.string().uri().required(),
  }),
});

export const validateRecipeId = celebrate({
  [Segments.BODY]: Joi.object().keys({
    repiceId: Joi.string().hex().length(24).required(),
  }),
});
