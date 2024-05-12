import { Routes, Route } from 'react-router-dom';
import Home from './components/home/homeContainer/Home';
import UserList from './components/users/userList/UserList';
import UserDetail from './components/users/userDetail/UserDetail';
import UserCreate from './components/users/UserLoginCreate/UserCreate/UserCreate';
import NavBar from './components/home/navbar/navbar';
import Footer from './components/home/footer/Footer';
import Pages from './components/pages/Pages'
import EventFormContainer from "./EventFormContainer/EventFormContainer";
import Styles from './App.module.css'


function App() {
    return (
        <>
        <div>
          <NavBar />
        </div>
         <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/event" element={<h1>HOLA</h1>} />
                <Route path="/cretateevent" element={          
                <div className={Styles.container}>
                <EventFormContainer /></div>} />
                <Route path="/login" element={<UserCreate />} />
                <Route path="/pages" element={<Pages />} />
                <Route path="/userlist" element={<UserList />} />
                <Route path="user/:userId" element={<UserDetail />} />
                <Route path="*" element={<h1>Page not found</h1>} />
         </Routes>
         <div>
          <Footer />
         </div>
        </>
    );
}
 //test

export default App;
