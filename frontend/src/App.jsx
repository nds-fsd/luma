import { QueryClient, QueryClientProvider } from 'react-query';

import { Routes, Route } from 'react-router-dom';
import UserLogin from './components/UserLogin/UserLogin';
import UserCreate from './components/UserCreate/UserCreate';
import Home from './components/home/HomeContainer/Home';
import UserList from './components/users/UserList/UserList';
import UserDetail from './components/users/UserDetail/UserDetail';
import UserLoginCreate from './components/users/UserLoginCreate/UserLoginCreate';
import NavBar from './components/home/NavBar/NavBar';
import Footer from './components/home/Footer/Footer';
import Pages from './components/Pages/Pages';
import EventFormContainer from './components/eventFormContainer/EventFormContainer';
import Styles from './App.module.css';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      {/*<UserLogin> ya existe el componente pero aún en construcción, tanto el frontend como el backend.*/}
      {/* <UserCreate /> */}
          <div className={Styles.container}>
            <EventFormContainer />
        </div>
    </>
  );
}

export default App;
