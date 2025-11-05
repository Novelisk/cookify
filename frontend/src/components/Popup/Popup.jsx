import { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { addFavorite } from '../../utils/api';

function Popup({ selectedMeal, onClose }) {
  const { user } = useContext(UserContext);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('popup')) onClose();
  };

  const handleAddFavorite = async () => {
    if (!user || !user.token) {
      setMessage('Inicia sesión para guardar receta.');
      return;
    }

    setIsSaving(true);
    setMessage('');

    try {
      const result = await addFavorite(user.token, selectedMeal);
      setMessage(result.message || 'Receta guardada en favoritos.');
    } catch (err) {
      console.error(err);
      setMessage('Error al guardar receta en favoritos.');
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!selectedMeal) return null;

  return (
    <div className="popup" onClick={handleOverlayClick}>
      <div className="popup__content">
        <button className="popup__close" onClick={onClose}></button>

        <img
          src={selectedMeal.strMealThumb}
          alt={selectedMeal.strMeal}
          className="popup__image"
        />
        <h2 className="popup__title">{selectedMeal.strMeal}</h2>
        <p className="popup__text">{selectedMeal.strInstructions}</p>

        <button
          className="popup__favorite-btn"
          onClick={handleAddFavorite}
          disabled={isSaving}
        >
          {isSaving ? 'Guardando...' : 'Guardar en favoritos'}
        </button>

        {message && <p className="popup__message">{message}</p>}
      </div>
    </div>
  );
}

export default Popup;
