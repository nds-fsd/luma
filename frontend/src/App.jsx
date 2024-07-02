import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
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
import AddCityForm from './components/cities/AddCityForm/AddCityForm';
import ProtectedRouteAdmin from './components/home/ProtectedRoute/ProtectedRoute';
import DiscoverEvents from './components/DiscoverEvents/DiscoverEvents';
import EditEventFormContainer from './components/Calendars/MyEvents/EditEventFormContainer/EditEventFormContainer';
import Calendars from './components/Calendars/Calendars';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Setting from './components/home/Setting/Setting';
import { AuthContext } from './components/users/AuthContext/AuthContext';
import {  getUserToken, removeSession, isTokenExpired } from './utils/localStorage.utils';

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
  const { isAuthenticated, handleLogin } = useContext(AuthContext);

  return (
    <>
      <div>
        <NavBar />
      </div>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/event' element={<Navigate to='/discoverevents' />} />
        <Route path='/user' element={<Navigate to='/discoverevents' />} />
        <Route path='/city' element={<Navigate to='/discoverevents' />} />
        <Route path='/eventcreate' element={<EventFormContainer />} />
        <Route
          path='/login'
          element={isAuthenticated ? <Navigate to='/eventcreate' /> : <UserLoginCreate handleLogin={handleLogin}/>}
        />
        <Route
          path='/admin'
          element={
            <AuthRoute>
              <ProtectedRouteAdmin >
                <Tabs className={Styles.tabs}>
                  <TabList className={Styles.tabList}>
                    <Tab className={Styles.tab} selectedClassName={Styles.tabSelected}>
                      Añadir ciudad
                    </Tab>
                    <Tab className={Styles.tab} selectedClassName={Styles.tabSelected}>
                      Lista de usuarios
                    </Tab>
                  </TabList>

                  <TabPanel className={Styles.tabPanel}>
                    <div className={Styles.scroll}>
                      <AddCityForm />
                    </div>
                  </TabPanel>
                  <TabPanel className={Styles.tabPanel}>
                    <div className={Styles.scroll}>
                      <UserList />
                    </div>
                  </TabPanel>
                </Tabs>
              </ProtectedRouteAdmin>
            </AuthRoute>
          }
        />
        <Route
          path='/user/:userId'
          element={
            <AuthRoute>
              <UserDetail/>
            </AuthRoute>
          }
        />
        <Route path='/city/:cityId' element={<EventPage />} />
        <Route path='/event/:eventId' element={<EventDetail />} />
        <Route path='/discoverevents' element={<DiscoverEvents />} />
        <Route path='/setting' element={<Setting />} />
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
              <Calendars />
            </AuthRoute>
          }
        />
        <Route path='*' element={isAuthenticated ? <Navigate to='/discoverevents' /> : <Navigate to='/' />} />
      </Routes>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default App;
