import { useContext, useEffect, useState } from 'react';
import { getFavorites, removeFavorite } from '../../utils/api';
import { UserContext } from '../../context/UserContext';
import FavoritesPopup from '../../components/FavoritesPopup/FavoritesPopup';

function UserProfile() {
  const { user } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    if (user?.token) {
      getFavorites(user.token).then(setFavorites).catch(console.error);
    }
  }, [user]);

  const handleRemove = async (recipeId, e) => {
    e.stopPropagation();
    try {
      await removeFavorite(user.token, recipeId);
      setFavorites((prev) => prev.filter((f) => f.recipeId !== recipeId));
    } catch (err) {
      console.error('Error al eliminar favorito:', err);
    }
  };

  return (
    <section className="user-profile">
      <h1 className="user-profile__title">Mis recetas favoritas</h1>
      {favorites.length === 0 ? (
        <p className="user-profile__empty">Aún no tienes recetas guardadas.</p>
      ) : (
        <ul className="user-profile__list">
          {favorites.map((meal) => (
            <li
              key={meal.recipeId}
              className="user-profile__item"
              onClick={() => setSelectedMeal(meal)}
            >
              <img
                src={meal.recipeThumb}
                alt={meal.recipeName}
                className="user-profile__meal-image"
              />
              <p className="user-profile__meal-name">{meal.recipeName} </p>
              <button
                className="user-profile__button"
                onClick={(e) => handleRemove(meal.recipeId, e)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}

      {selectedMeal && (
        <FavoritesPopup
          meal={selectedMeal}
          onClose={() => setSelectedMeal(null)}
        />
      )}
    </section>
  );
}

export default UserProfile;
