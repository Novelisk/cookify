import { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import logo from '/src/assets/images/Logo_header.png';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  const isLoggedIn = user?.isLoggedIn || false;
  const formatName = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';

  const userName = user?.name
    ? formatName(user.name.split(' ')[0])
    : user?.email
      ? formatName(user.email.split('@')[0])
      : 'User';

  const isAuthPage =
    location.pathname === '/signin' || location.pathname === '/signup';

  return (
    <header className="header">
      <div className="header__image" onClick={() => navigate('/main')}>
        <img src={logo} alt="Cookify Logo" className="header__logo" />
      </div>

      <div className="header__user-profile">
        {isLoggedIn ? (
          <>
            <span className="header__username">{userName}</span>
            <button
              className="header__btn-profile"
              onClick={() => navigate('/userProfile')}
            >
              Mi Perfil
            </button>
            <button className="header__btn-logout" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </>
        ) : (
          !isAuthPage && (
            <button
              className="header__btn-login"
              onClick={() => navigate('/signin')}
            >
              Iniciar Sesión
            </button>
          )
        )}
      </div>
    </header>
  );
}

export default Header;
