import { useContext, useEffect, useState } from 'react';
import { getFavorites, removeFavorite } from '../../utils/api';
import { UserContext } from '../../context/UserContext';

function UserProfile() {
  const { user } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!user.token) {
      getFavorites(user.token).then(setFavorites);
    }
  }, user);

  const handleRemove = async (idMeald) => {
    await removeFavorite(user.token, idMeald);
    setFavorites((prev) => prev.filter((f) => f.mealId !== idMeald));
  };

  return (
    <>
      <h1 className="user-profile__title"></h1>
      <ul className="user-profile__list">
        {favorites.map((meal) => (
          <li key={meal.mealId}>
            <img
              src={meal.mealThumb}
              alt={meal.mealName}
              className="user-profile__meal_image"
            />
            <p className="user-profile__meal_name">{meal.mealName} </p>
            <buttoon
              className="user-profile__button"
              onClick={() => handleRemove(meal.mealId)}
            >
              Eliminar
            </buttoon>
          </li>
        ))}
      </ul>
    </>
  );
}

export default UserProfile;
