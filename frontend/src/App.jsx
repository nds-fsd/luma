import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Home from './components/home/HomeContainer/Home';
import UserList from './components/users/UserList/UserList';
import UserDetail from './components/users/UserDetail/UserDetail';
import UserLoginCreate from './components/users/UserLoginCreate/UserLoginCreate';
import NavBar from './components/home/NavBar/NavBar';
import Footer from './components/home/Footer/Footer';
import EventFormContainer from './components/EventFormContainer/EventFormContainer';
import Styles from './App.module.css';
import EventPage from './components/events/eventPage/EventPage';
import EventDetail from './components/events/eventDetail/EventDetail';
import { getUserSession, getUserToken, removeSession, isTokenExpired } from './utils/localStorage.utils';
import { useState, useEffect } from 'react';
import AddCityForm from './components/home/ProtectedRoute/AddCityForm/AddCityForm';
import ProtectedRoute from './components/home/ProtectedRoute/ProtectedRoute';
import DiscoverEvents from './components/DiscoverEvents/DiscoverEvents';
import EditEventFormContainer from './components/HomePage/EditEventFormContainer/EditEventFormContainer';
import Calendars from './components/Calendars/Calendars'; //Test

const AuthRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = getUserToken();

  useEffect(() => {
    if (!token || isTokenExpired(token)) {
      removeSession();
      navigate('/login');
    }
  }, [token, navigate]);

  return token && !isTokenExpired(token) ? children : null;
};

function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(!!getUserToken());
  const [isDropdownOpen, setDropdownOpen] = useState(false);



  const user = getUserSession() || {};

  const userPicture = user && user.profile_picture ? user.profile_picture : '';
  const userEmail = user && user.email ? user.email : '';
  const userFullName = user && user.fullname ? user.fullname : '';
  const userRole = user && user.role ? user.role : '';
  const userId = user && user._id ? user._id: '';
  const userSocialNetworks = user && user.socialNetworks ? user.socialNetworks : [];

  const handleLogin = () => {
    setIsAuthenticated(true);
    setDropdownOpen(false);
    navigate('/home', { replace: true, state: { fromLogin: true } });
  };

  const handleGoToOwnProfile = () => {
    navigate(`/user/${userId}`);
    setDropdownOpen(false);
  };

  const handleGoToConfiguration = () => {
    navigate(`/admin`);
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    removeSession();
    setIsAuthenticated(false);
    navigate(`/`);
  };

  return (
    <>
      <div>
        <NavBar
          IsAuthenticated={isAuthenticated}
          handleLogout={handleLogout}
          userPicture={userPicture}
          userFullName={userFullName}
          userRole={userRole}
          userEmail={userEmail}
          handleGoToOwnProfile={handleGoToOwnProfile}
          isDropdownOpen={isDropdownOpen}
          setDropdownOpen={setDropdownOpen}
          handleGoToConfiguration={handleGoToConfiguration}
        />
      </div>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/event' element={<Navigate to='/discoverevents' />} />
        <Route path='/user' element={<Navigate to='/discoverevents' />} />
        <Route path='/city' element={<Navigate to='/discoverevents' />} />
        <Route
          path='/eventcreate'
          element={
              <EventFormContainer isAuthenticated={isAuthenticated} />
          }
        />
        <Route
          path='/login'
          element={isAuthenticated ? <Navigate to='/eventcreate' /> : <UserLoginCreate handleLogin={handleLogin} />}
        />
        <Route
          path='/admin'
          element={
            <AuthRoute>
              <ProtectedRoute isAuthenticated={isAuthenticated} userRole={userRole}>
                <div className={Styles.protectedRoute}>
                  <div>
                    <AddCityForm />
                  </div>
                  <div>
                    <UserList />
                  </div>
                </div>
              </ProtectedRoute>
            </AuthRoute>
          }
        />
        <Route
          path='/user/:userId'
          element={
            <AuthRoute>
              <UserDetail isAuthenticated={isAuthenticated} />
            </AuthRoute>
          }
        />
        <Route
          path='/city/:cityId'
          element={
              <EventPage userEmail={userEmail} isAuthenticated={isAuthenticated} />
          }
        />
        <Route
          path='/event/:eventId'
          element={
              <EventDetail userEmail={userEmail} isAuthenticated={isAuthenticated} />
          }
        />
        <Route
          path='/discoverevents'
          element={
              <DiscoverEvents isAuthenticated={isAuthenticated} />
          }
        />
        <Route
          path='/calendars'
          element={
            <AuthRoute>
              <Calendars />
            </AuthRoute>
          }
        />
        <Route
          path='/editevent'
          element={
            <AuthRoute>
              <EditEventFormContainer />
            </AuthRoute>
          }
        />
        <Route
          path='/home'
          element={
            <AuthRoute>
              <Calendars isAuthenticated={isAuthenticated} userId={userId} userFullName={userFullName} />
            </AuthRoute>
          }
        />
        <Route
          path='*'
          element={
            isAuthenticated ? (
              <Navigate to='/discoverevents' />
            ) : (
              <Navigate to='/' />
            )
          }
        />
      </Routes>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default App;
