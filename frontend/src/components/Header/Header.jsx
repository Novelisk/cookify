import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import SearchBar from '../SearchBar/SearchBar';

function Header({ onSearch }) {
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <header className="header">
      <div className="header__top-line"></div>
      <div className="header__image" onClick={() => navigate('/main')}>
        <img
          src="/src/assets/images/Logo_header.png"
          alt="Cookify Logo"
          className="header__logo"
        />
      </div>

      {user.isLoggedIn && (
        <div className="header__search-bar">
          <SearchBar onSearch={onSearch} />
        </div>
      )}

      <div className="header__user-profile">
        {user.isLoggedIn ? (
          <>
            <span className="header__username">
              {user.name || user.email.split('@')[0]}
            </span>
            <button
              className="header__btn-profile"
              onClick={() => navigate('/userProfile')}
            >
              Mi Perfil
            </button>
            <button className="header__btn-logout" onClick={() => handleLogout}>
              Cerrar Sesión
            </button>
          </>
        ) : (
          <button
            className="header__btn-login"
            onClick={() => navigate('/signin')}
          >
            Iniciar Sesión
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
