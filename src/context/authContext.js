// AuthContext.js

import { createContext, useState, useEffect } from "react";
import Cookies from "universal-cookie";
import Api from "../Components/Api";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );

  const cookies = new Cookies();
  const accessToken = cookies.get("access_token");

  const login = async (input) => {
    const res = await Api.post("/auth/login", input);
    setCurrentUser(res.data);
  };

  const logout = async () => {
    await Api.post("/auth/logout");
    cookies.remove("access_token");
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
};
