import { Routes, Route } from 'react-router-dom';
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
import HomePage from './components/HomePage/HomePage'

function App() {
  return (
    <>
    <HomePage/>
      {/* <div>
        <NavBar />
      </div>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/event' element={<EventPage/>} />
        <Route
          path='/createevent'
          element={
            <div className={Styles.container}>
              <EventFormContainer />
            </div>
          }
        />
        <Route path='/login' element={<UserLoginCreate />} />
        <Route path='/pages' element={<Pages />} />
        <Route path='/userlist' element={<UserList />} />
        <Route path='user/:userId' element={<UserDetail />} />
        <Route path='/eventdetail' element={<EventDetail />} />
        <Route path='*' element={<h1>Page not found</h1>} />
      </Routes>
      <div>
        <Footer /> 
      </div>*/}
    </>
  );
}

export default App;