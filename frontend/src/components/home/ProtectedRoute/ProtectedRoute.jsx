import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ userRole, children }) => {

  if (userRole !== 'ADMIN') {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
