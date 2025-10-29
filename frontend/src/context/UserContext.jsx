import { createContext, useState, useEffect } from 'react';
import { setToken, getToken, removeToken } from '../utils/token';
import { validateToken } from '../utils/auth';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    name: '',
    email: '',
    token: '',
    isLoggedIn: false,
  });

  useEffect(() => {
    const token = getToken();
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      validateToken(token)
        .then((isValid) => {
          if (isValid) {
            const parsedUser = JSON.parse(storedUser);
            setUser({
              ...parsedUser,
              token,
              isLoggedIn: true,
            });
          } else {
            logout();
          }
        })
        .catch((err) => {
          console.error('Error al validar el token:', err);
          logout();
        });
    }
  }, []);

  const login = (userData, token) => {
    try {
      setToken();
      localStorage.setItem('user', JSON.stringify(userData));
      setUser({ ...userData, token, isLoggedIn: true });
    } catch (err) {
      console.error('Error al guardar sesión:', err);
    }
  };

  const logout = () => {
    try {
      removeToken();
      localStorage.removeItem('user');
      setUser({ name: '', email: '', token: '', isLoggedIn: false });
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
