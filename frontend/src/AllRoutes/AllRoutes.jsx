import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import CheckTrainAvailability from '../components/TrainAvailable';
import BookedDetails from '../components/BookedDetails';
import AddTrain from '../components/AddTrain';
import AddStation from '../components/AddStation'; // Adjust the path if necessary
import { PrivateRouter, PrivateRouterUser } from './PrivateRoute';

const AllRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes for Admin */}
    
        <Route path="/add-train" element={<PrivateRouter><AddTrain /></PrivateRouter>} />
        <Route path="/add-station" element={<PrivateRouter><AddStation /></PrivateRouter>} />
 
      {/* Protected Routes for User */}
      
        <Route path="/train" element={<PrivateRouterUser><CheckTrainAvailability /></PrivateRouterUser>} />
        <Route path="/booking-details" element={<PrivateRouterUser><BookedDetails /></PrivateRouterUser>} />
      
      
      {/* Fallback for unknown routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AllRoutes;
