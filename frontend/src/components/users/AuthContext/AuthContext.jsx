import React, { createContext, useState, useEffect } from 'react';
import { getUserToken, removeSession, isTokenExpired, getUserSession } from '../../../utils/localStorage.utils';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getUserToken());
  const [user, setUser] = useState(getUserSession() || {});
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  /*useEffect(() => {
    const token = getUserToken();
    if (!token || isTokenExpired(token)) {
      removeSession();
      setIsAuthenticated(false);
      setUser({});
      navigate('/login');
    } else {
      setIsAuthenticated(true);
      setUser(getUserSession());
    }
  }, [navigate]);*/

  const handleLogin = () => {
    setIsAuthenticated(true);
    setUser(getUserSession());
    setDropdownOpen(false);
    navigate('/home', { replace: true, state: { fromLogin: true } });
  };

  const handleLogout = () => {
    removeSession();
    setIsAuthenticated(false);
    setUser({});
    navigate('/');
  };

  const handleGoToOwnProfile = () => {
    navigate(`/user/${user._id}`);
    setDropdownOpen(false);
  };

  const handleGoToAdmin = () => {
    navigate(`/admin`);
    setDropdownOpen(false);
  };

  const handleGoToConfiguration = () => {
    navigate(`/setting`);
    setDropdownOpen(false);
  };

  const userPicture = user.profile_picture || '';
  const userEmail = user.email || '';
  const userFullName = user.fullname || '';
  const userRole = user.role || '';
  const userId = user._id || '';
  const userToken = getUserToken();

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userPicture,
        userEmail,
        userFullName,
        userRole,
        userId,
        userToken,
        handleLogin,
        handleLogout,
        handleGoToOwnProfile,
        handleGoToAdmin,
        handleGoToConfiguration,
        isDropdownOpen,
        setDropdownOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
