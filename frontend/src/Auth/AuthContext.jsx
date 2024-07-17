import React, { createContext, useContext, useState } from 'react'
export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// const userRes = {
//     isAuth: false,
//     token: "",
//     isAdmin: "",
//     isUser:"",
//     userId:""
//   };
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
  return (
   <AuthContext.Provider value={{isLoggedIn,setIsLoggedIn}}>
    {children}
   </AuthContext.Provider>
  )
}


