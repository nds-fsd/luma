import { Routes, Route } from 'react-router-dom';
import Home from './components/home/homeContainer/Home';
import UserList from './components/users/userList/userList';
import UserCreate from './components/UserCreate/UserCreate';
import NavBar from './components/home/navbar/navbar';
import Footer from './components/home/footer/Footer';


function App() {
    return (
        <>
        <div>
          <NavBar />
        </div>
         <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/eventos" element={<h1>Hola</h1>} />
                <Route path="/login" element={<UserCreate />} />
                <Route path="/userlist" element={<UserList />} />
                <Route path="*" element={<h1>Page not found</h1>} />
         </Routes>
         <div>
          <Footer />
         </div>
        </>
    );
}


export default App;
