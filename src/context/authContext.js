import Api from "../Components/Api.js";
import React, { createContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";

export const AuthContext = createContext(); // Create a context using createContext()
const cookies = new Cookies();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );

  const login = async (input) => {
    const res = await Api.post("/auth/login", input);
    cookies.set("access_token", res.data.token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      domain: window.location.hostname,
    });
    setCurrentUser(res.data);
  };

  const logout = async () => {
    await Api.post("/auth/logout");
    cookies.remove("access_token");
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser)); // Provide a key for storing the value in localStorage
  }, [currentUser]); // Add currentUser as a dependency in the dependency array

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
