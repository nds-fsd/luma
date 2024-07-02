import { Navigate } from 'react-router-dom';
import { useContext  } from 'react';
import { AuthContext } from '../../users/AuthContext/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { userRole } = useContext(AuthContext);

  if (userRole !== 'ADMIN') {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
