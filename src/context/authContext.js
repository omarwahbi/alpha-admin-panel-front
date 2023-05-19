import Api from "../Components/Api.js";
import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext(); // Create a context using createContext()

export const AuthContextProvider = ({ children }) => {
  const login = async (input) => {
    const res = await Api.post("/auth/login", input);
    Cookies.set("access_token", res.data.token, { expires: 7 });
  };

  const logout = async () => {
    await Api.post("/auth/logout");
    Cookies.remove("access_token");
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
