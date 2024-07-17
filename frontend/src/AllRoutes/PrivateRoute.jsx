
import React from 'react'
import { AuthContext, useAuth } from '../Auth/AuthContext'
import { Navigate } from "react-router-dom";
export const PrivateRouter = ({ children }) => {
    const { isLoggedIn } = useAuth();
    return (
      <>
        {isLoggedIn.isAuth && isLoggedIn.isAdmin !== "admin" ? (
          children
        ) : isLoggedIn.isAuth ? (
          <Navigate to="/" />
        ) : (
          <Navigate to="/login" />
        )}
      </>
    );
  };
  
  export const PrivateRouterUser = ({ children }) => {
    const { isLoggedIn } = useAuth();
    return (
      <>
        {isLoggedIn.isAuth && isLoggedIn.isAdmin !== "admin" ? (
          children
        ) : (
          <Navigate to="/login" />
        )}
      </>
    );
  };
