import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(); // Create a context using createContext()

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );

  const login = async (input) => {
    const res = await axios.post("/auth/login", input);
    setCurrentUser(res.data);
  };

  const logout = async () => {
    await axios.post("/auth/logout");
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
