import { createContext, useContext,useState,useEffect } from "react";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData,setuserData] = useState(null);
  const auth = () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const user = jwtDecode(accessToken).userInfo;
      return {accessToken,user}

    } catch (err) {
      return {user:null, accessToken:null};
    }
  };
  useEffect(()=>{
    console.log("userData")
  },[userData])
  const setAuth = ( accessToken) => {
    localStorage.setItem("accessToken", accessToken);
  };
  const logout = () => {
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout,userData,setuserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
