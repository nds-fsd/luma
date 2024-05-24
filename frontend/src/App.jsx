import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Home from './components/home/HomeContainer/Home';
import UserList from './components/users/UserList/UserList';
import UserDetail from './components/users/UserDetail/UserDetail';
import UserLoginCreate from './components/users/UserLoginCreate/UserLoginCreate';
import NavBar from './components/home/NavBar/NavBar';
import Footer from './components/home/Footer/Footer';
import Pages from './components/Pages/Pages';
import EventFormContainer from './components/EventFormContainer/EventFormContainer';
import Styles from './App.module.css';
import EventPage from './components/events/eventPage/EventPage';
import EventDetail from './components/events/eventDetail/EventDetail';
import { getUserToken, removeSession } from './utils/localStorage.utils';
import { getUserTokenData } from './utils/tokenData';
import { useState, useEffect } from 'react';
import AddCityForm from './components/home/ProtectedRoute/AddCityForm/AddCityForm';
import ProtectedRoute from './components/home/ProtectedRoute/ProtectedRoute';
import DiscoverEvents from './components/DiscoverEvents/DiscoverEvents';
import HomePage from './components/HomePage/HomePage';
import EditEventFormContainer from './components/HomePage/EditEventFormContainer/EditEventFormContainer';

function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(!!getUserToken());
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [userFullName, setUserFullName] = useState('');
  const [userPicture, setUserPicture] = useState('');
  const [userId, setUserId] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = getUserToken();
        if (token) {
          const userData = await getUserTokenData(token);
          setUserFullName(userData.fullName);
          setUserPicture(userData.picTure);
          setUserId(userData.iD);
          setUserRole(userData.role);
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    if (isAuthenticated) {
      fetchUserData();
    } else {
      setUserFullName('');
      setUserPicture('');
      setUserId('');
      setUserRole('');
    }
  }, [isAuthenticated]);

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
          path='/createevent'
          element={<EventFormContainer />}
        />
        <Route
          path='/login'
          element={isAuthenticated ? <Navigate to='/createevent' /> : <UserLoginCreate handleLogin={handleLogin} />}
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
        <Route path='/home' element={<HomePage />} />
        <Route path='*' element={<h1>Page not found</h1>} />
      </Routes>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default App;
