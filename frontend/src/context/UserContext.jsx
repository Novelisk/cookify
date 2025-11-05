import { createContext, useState, useEffect } from 'react';
import { setToken, getToken, removeToken } from '../utils/token';
import { validateToken } from '../utils/auth';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const token = getToken();
    const storedUser = localStorage.getItem('user');

    if (!token) {
      setUser(null);
      setIsCheckingAuth(false);
      return;
    }

    if (storedUser) {
      const parsedUser = JSON.stringify(storedUser);
      setUser({ ...parsedUser, token, isLoggedIn: true });
      setIsCheckingAuth(false);
    }

    validateToken(token)
      .then((data) => {
        const userData = data.user || data;

        if (userData && userData.email) {
          const finalUser = {
            name: userData.name || userData.email.split('@')[0],
            email: userData.email,
            token,
            isLoggedIn: true,
          };
          setUser(finalUser);
          localStorage.setItem('user', JSON.stringify(finalUser));
        } else {
          removeToken();
          setUser(null);
        }
      })
      .catch((err) => {
        console.error('Error al validar el token:', err);
        removeToken();
        setUser(null);
      })
      .finally(() => setIsCheckingAuth(false));
  }, []);

  const login = (userData, token) => {
    const finalUser = {
      name: userData.name || userData.email.split('@')[0],
      email: userData.email,
      token,
      isLoggedIn: true,
    };
    setToken(token);
    localStorage.setItem('user', JSON.stringify(finalUser));
    setUser(finalUser);
  };

  const logout = () => {
    removeToken();
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isCheckingAuth }}>
      {children}
    </UserContext.Provider>
  );
};
