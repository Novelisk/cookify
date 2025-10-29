import { useEffect } from 'react';

function Popup({ children, onClose }) {
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('popup')) onClose();
  };

  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="popup" onClick={handleOverlayClick}>
      <div className="popup__content">
        <button className="popup__close" onClick={onClose}></button>
        {children}
      </div>
    </div>
  );
}

export default Popup;
