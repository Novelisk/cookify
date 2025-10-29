import { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import Loader from '../../components/Loader/Loader';
import Popup from '../../components/Popup/Popup';
import { searchMeals } from '../../utils/api';

function Main() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [visibleCount, setVisibleCount] = useState(3);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const handleSearch = async (query) => {
    setIsLoading(true);
    setError('');
    setMeals([]);
    try {
      const data = await searchMeals(query);
      if (!data.length) {
        setError('No existen coincidencias con la búsqueda.');
      } else {
        setMeals(data);
      }
    } catch (err) {
      console.error(err);
      setError('Error al conectar con la API.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowMore = () => setVisibleCount((prev) => prev + 3);

  return (
    <main className="main">
      <h1 className="main__title">Explora recetas</h1>
      <SearchBar onSearch={handleSearch} />

      {isLoading && <Loader />}
      {error && <p className="main__error">{error}</p>}

      <div className="main__grid">
        {meals.slice(0, visibleCount).map((meal) => (
          <div
            key={meal.idMeal}
            className="card"
            onClick={() => setSelectedMeal(meal)}
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="card__image"
            />
            <p className="card__title">{meal.strMeal} </p>
          </div>
        ))}
      </div>

      {!isLoading && meals.length > visibleCount && (
        <button className="main__showmore" onClick={handleShowMore}>
          Mostrar más
        </button>
      )}

      {selectedMeal && (
        <Popup onClose={() => setSelectedMeal(null)}>
          <img
            src={selectedMeal.strMealThumb}
            alt={selectedMeal.strMeal}
            className="popup__image"
          />
          <h2 className="popup__title">{selectedMeal.strMeal} </h2>
          <p className="popup__text">{selectedMeal.strInstructions} </p>
        </Popup>
      )}
    </main>
  );
}

export default Main;
