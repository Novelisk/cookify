const MEALDB_URL = 'https://www.themealdb.com/api/json/v1/1';
const BACKEND_URL = 'https://api.cookify.mooo.com/api';

// MEALDB URL

export async function searchMeals(query) {
  try {
    const res = await fetch(
      `${MEALDB_URL}/search.php?s=${encodeURIComponent(query)}`
    );
    const data = await res.json();
    return data.meals || [];
  } catch (err) {
    console.error('Error al buscar recetas:', err);
    return [];
  }
}

export async function getMealById(idMeal) {
  try {
    const res = await fetch(`${MEALDB_URL}/lookup.php?i=${idMeal}`);
    const data = await res.json();
    return data.meals ? data.meals[0] : null;
  } catch (err) {
    console.error('Error al obtener receta:', err);
    return null;
  }
}

export async function getRandomMeal() {
  try {
    const res = await fetch(`${MEALDB_URL}/random.php`);
    const data = await res.json();
    return data.meals ? data.meals[0] : null;
  } catch (err) {
    console.error('Error al obtener receta aleatoria:', err);
    return null;
  }
}

//BACKEND URL

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok)
    throw new Error(
      data.message || 'Error al solicitar respuesta del servidor.'
    );
  return data;
}

export async function signUp(userdata) {
  const res = await fetch(`${BACKEND_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userdata),
  });
  return handleResponse(res);
}

export async function signIn(credentials) {
  const res = await fetch(`${BACKEND_URL}/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return handleResponse(res);
}

export async function getUserProfile(token) {
  const res = await fetch(`${BACKEND_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(res);
}

export async function addFavorite(token, recipeData) {
  const res = await fetch(`${BACKEND_URL}/users/favorites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(recipeData),
  });
  return handleResponse(res);
}

export async function removeFavorite(token, recipeId) {
  const res = await fetch(`${BACKEND_URL}/users/favorites/${recipeId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  return handleResponse(res);
}

/*
export async function addFavorite(token, meal) {
  try {
    const res = await fetch(`${BACKEND_URL}/favorites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        mealId: meal.idMeal,
        mealName: meal.strMeal,
        mealThumb: meal.strMealThumb,
        sourceUrl: meal.strSource || meal.strYoutube || '',
      }),
    });

    const data = await res.json();
    if (!res.ok)
      throw new Error(
        data.message || 'No se pudo guardar la receta en favoritos'
      );
    return data;
  } catch (err) {
    console.error('Error al guardar la receta en favoritos:', err);
    throw err;
  }
}
  */

export async function getFavorites(token) {
  try {
    const res = await fetch(`${BACKEND_URL}/favorites`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Error al obtener favoritos:', err);
    return [];
  }
}

/*
export async function removeFavorite(token, mealId) {
  try {
    const res = await fetch(`${BACKEND_URL}/favorites/${mealId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('No se pudo eliminar de favoritos.');
    return true;
  } catch (err) {
    console.error('Error al eliminar de favoritos:', err);
    return false;
  }
}
  */
