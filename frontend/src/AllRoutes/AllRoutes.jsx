
import React from 'react'

import { Route, Routes, Navigate } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import Home from '../components/Home';
import CheckTrainAvailability from '../components/TrainAvailable';
const AllRoutes = () => {
  return (
    <div>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/train" element={<CheckTrainAvailability/>}/>
     </Routes>
    </div>
  )
}

export default AllRoutes
