import React, { createContext, useContext, useState } from 'react'
export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthContextProvider ({children}){
    const userRes = {
        isAuth: false,
        token: "",
        isAdmin: "",
        isUser:"",
        userId:""
      };
    const [isLoggedIn,setIsLoggedIn] = useState(userRes);
    console.log(isLoggedIn)
    const logout = () => {
      setIsLoggedIn(userRes);
    };
  return (
   <AuthContext.Provider value={{isLoggedIn,setIsLoggedIn,logout}}>
    {children}
   </AuthContext.Provider>
  )
}


