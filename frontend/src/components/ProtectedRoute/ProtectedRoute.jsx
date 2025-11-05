import { Navigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';
import Loader from '../Loader/Loader';

function ProtectedRoute({ children }) {
  const { user, isCheckingAuth } = useContext(UserContext);

  if (isCheckingAuth) {
    return <Loader />;
  }

  if (!user || !user.isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}

export default ProtectedRoute;
