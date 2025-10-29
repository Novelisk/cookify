import User from '../models/User.js';

export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).send({ message: 'Usuario no encontrado.' });
  res.send(user);
};

export const addFavorite = async (req, res) => {
  const { recipeId, recipeName, recipeThumb, recipeLink } = req.body;
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).send({ message: 'Usuario no encontrado.' });

  if (user.favorites.find((fav) => fav.recipeId === recipeId)) {
    return res
      .status(400)
      .send({ message: 'La receta ya se encuentra en recetas favoritas.' });
  }

  user.favorites.push({ recipeId, recipeName, recipeThumb, recipeLink });
  await user.save();
  res.status(201).send({ message: 'Receta guardada en recetas favoritas.' });
};

export const removeFavorite = async (req, res) => {
  const user = User.findById(req.user.id);
  user.favorites = user.favorites.filter(
    (fav) => fav.recipeId !== req.params.recipeId
  );
  await user.save();
  res.send({ message: 'Receta eliminada de recetas favoritas.' });
};
