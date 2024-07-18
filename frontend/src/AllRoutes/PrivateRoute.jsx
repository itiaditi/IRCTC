import React from 'react';
import { useAuth } from '../Auth/AuthContext';
import { Navigate } from 'react-router-dom';

// Private router for admin role
export const PrivateRouterAdmin = ({ children }) => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      {isLoggedIn.isAuth && isLoggedIn.isAdmin === "admin" ? (
        children
      ) : isLoggedIn.isAuth ? (
        <Navigate to="/" />
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

// Private router for user role
export const PrivateRouterUser = ({ children }) => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      {isLoggedIn.isAuth && isLoggedIn.isUser === "user" ? (
        children
      ) : isLoggedIn.isAuth ? (
        <Navigate to="/" />
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};
