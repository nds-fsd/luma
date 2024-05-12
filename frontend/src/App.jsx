import { Routes, Route } from 'react-router-dom';
import Home from './components/home/homeContainer/Home';
import UserList from './components/users/userList/userList';
import UserCreate from './components/UserCreate/UserCreate';
import NavBar from './components/home/navbar/navbar';
import Footer from './components/home/footer/Footer';
import EventFormContainer from "./EventFormContainer/EventFormContainer";
import Styles from './App.module.css'

import React from "react";
import { Routes, Route } from 'react-router-dom';
import EventPage from './components/events/eventPage/EventPage';
import EventDetail from './components/events/eventDetail/EventDetail';

function App() {
    return (
        <>
        <div>
          <NavBar />
        </div>
         <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/event" element={<EventPage />} />
                <Route path="/cretateevent" element={          
                <div className={Styles.container}>
                <EventFormContainer /></div>} />
                <Route path="/login" element={<UserCreate />} />
                <Route path="/userlist" element={<UserList />} />
                <Route path="/eventDetail" element={<EventDetail />} />
                <Route path="*" element={<h1>Page not found</h1>} />
         </Routes>
         <div>
          <Footer />
         </div>
        </>
    );
 }


      
    

export default App;