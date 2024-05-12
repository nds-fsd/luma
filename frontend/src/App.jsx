import React from "react";
import { Routes, Route } from 'react-router-dom';
import EventPage from './components/events/eventPage/EventPage';
import EventDetail from './components/events/eventDetail/EventDetail';

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<h1></h1>} />
        <Route path="/eventos" element={<h1></h1>} />
        <Route path="/login" element={<h1></h1>} />
        <Route path="/eventDetail" element={<EventDetail />} />
        <Route path="/eventPage" element={<EventPage />} />
      </Routes>  

      
    </>
  );
}

      
    

export default App;