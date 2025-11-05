import { useEffect } from 'react';

function FavoritesPopup({ meal, onClose }) {
  const image = meal.recipeThumb;
  const name = meal.recipeName || 'Receta sin nombre';
  const link = meal.recipeLink;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('popup')) onClose();
  };

  useEffect(() => {
    if (!meal) return null;

    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [meal, onClose]);

  return (
    <div className="popup" onClick={handleOverlayClick}>
      <div className="popup__content">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
        ></button>

        <img src={image} alt={name} className="popup__image" />
        <h2 className="popup__title">{name}</h2>

        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="popup__favorite-btn"
          >
            Ver receta
          </a>
        ) : (
          <p className="popup__message">Esta receta no contiene enlace.</p>
        )}
      </div>
    </div>
  );
}

export default FavoritesPopup;
