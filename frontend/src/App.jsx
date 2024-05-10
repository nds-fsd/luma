import { Routes, Route } from 'react-router-dom';
import Home from './components/home/homeContainer/Home';
import UserList from './components/users/userList/userList';



function App() {
    return (
        <>
         <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/eventos" element={<h1>Hola</h1>} />
                <Route path="/login" element={<h1>Hola</h1>} />
                <Route path="/userlist" element={<UserList />} />
                <Route path="*" element={<h1>Page not found</h1>} />
         </Routes>
        </>
    );
}


export default App;
