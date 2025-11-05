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
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    const before = user.favorites.length;
    user.favorites = user.favorites.filter(
      (fav) => fav.recipeId !== req.params.recipeId
    );

    if (user.favorites.length === before) {
      return res
        .status(404)
        .json({ message: 'Receta no encontrada en favoritos.' });
    }

    await user.save();

    res.status(200).json({ message: 'Receta eliminada de favoritos.' });
  } catch (err) {
    console.error('Error al eliminar favorito:', err);
    res.status(500).json({ message: 'Error interno al eliminar favorito.' });
  }
};
