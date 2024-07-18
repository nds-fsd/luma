import { createContext, useState, useEffect } from 'react';
import { getUserToken, removeSession, isTokenExpired, getUserSession } from '../../../utils/localStorage.utils';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getUserToken());
  const [token, setToken] = useState(getUserToken());
  const [user, setUser] = useState(getUserSession() || {});
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = getUserToken();
    if (token && isTokenExpired(token)) {
      removeSession();
      setIsAuthenticated(false);
      setUser({});
    } else if (token) {
      setIsAuthenticated(true);
      setUser(getUserSession());
    }
  }, []);

useEffect(() => {
  if(isAuthenticated){
    console.log('connecting to socket');
    if(socket) socket.disconnect();
    const newSocket = io('ws://localhost:3001', {
      auth: {
        token
      }
    });


    setSocket(newSocket);
  }
}, [token, isAuthenticated])

  const handleLogin = () => {
    setIsAuthenticated(true);
    setUser(getUserSession());
    setToken(getUserToken());
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
        socket
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
