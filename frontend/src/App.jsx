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
import { getUserSession, getUserToken, removeSession } from './utils/localStorage.utils';
import { useState } from 'react';
import AddCityForm from './components/home/ProtectedRoute/AddCityForm/AddCityForm';
import ProtectedRoute from './components/home/ProtectedRoute/ProtectedRoute';
import DiscoverEvents from './components/DiscoverEvents/DiscoverEvents';
import HomePage from './components/HomePage/HomePage';
import EditEventFormContainer from './components/HomePage/EditEventFormContainer/EditEventFormContainer';

function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(!!getUserToken());
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const user = getUserSession() || {};

  const userPicture = user && user.profile_picture ? user.profile_picture : '';

  const userFullName = user && user.fullname ? user.fullname : '';

  const userRole = user && user.role ? user.role : '';

  const userId = user._id;

  const handleLogin = () => {
    setIsAuthenticated(true);
    setDropdownOpen(false);
    navigate(`/home`);
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
          handleGoToOwnProfile={handleGoToOwnProfile}
          isDropdownOpen={isDropdownOpen}
          setDropdownOpen={setDropdownOpen}
          handleGoToConfiguration={handleGoToConfiguration}
        />
      </div>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/event' element={<EventPage />} />
        <Route
          path='/eventcreate'
          element={<EventFormContainer  isAuthenticated={isAuthenticated}/>}
        />
        <Route
          path='/login'
          element={isAuthenticated ? <Navigate to='/eventcreate' /> : <UserLoginCreate handleLogin={handleLogin} />}
        />
        <Route
          path='/admin'
          element={
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
          }
        />
        <Route path='/userlist' element={<UserList />} />
        <Route path='/user/:userId' element={<UserDetail />} />
        <Route path='/city/:cityId' element={<EventPage />} />
        <Route path='/event/:eventId' element={<EventDetail />} />
        <Route path='/discoverevents' element={<DiscoverEvents handleGoToOwnProfile={handleGoToOwnProfile} />} />
        <Route path='/editevent' element={<EditEventFormContainer />} />
        <Route path='/home' element={<HomePage isAuthenticated={isAuthenticated} userId={userId}/>} />
        <Route path='*' element={<h1>Page not found</h1>} />
      </Routes>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default App;
