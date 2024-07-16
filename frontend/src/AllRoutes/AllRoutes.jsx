
import React from 'react'

import { Route, Routes, Navigate } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import Home from '../components/Home';
import CheckTrainAvailability from '../components/TrainAvailable';
import BookTrain from '../components/Booking';
import BookedDetails from '../components/BookedDetails';
import AddTrain from '../components/AddTrain';
import AddStation from '../components/AddStation';
const AllRoutes = () => {
  return (
    <div>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/train" element={<CheckTrainAvailability/>}/>
      <Route path="/booking" element={<BookTrain/>}/>
      <Route path="/booking-details" element={<BookedDetails/>}/>
      <Route path="/add-train" element={<AddTrain/>}/>
      <Route path="/add-station" element={<AddStation/>}/>
     </Routes>
    </div>
  )
}

export default AllRoutes
