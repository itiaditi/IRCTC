
import React from 'react'

import { Route, Routes, Navigate } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import Home from '../components/Home';
import CheckTrainAvailability from '../components/TrainAvailable';
import BookTrain from '../components/Booking';
const AllRoutes = () => {
  return (
    <div>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/train" element={<CheckTrainAvailability/>}/>
      <Route path="/booking" element={<BookTrain/>}/>
     </Routes>
    </div>
  )
}

export default AllRoutes
