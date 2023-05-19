import Api from "../Components/Api.js";
import React, { createContext } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext(); // Create a context using createContext()

export const AuthContextProvider = ({ children }) => {
  const login = async (input) => {
    const res = await Api.post("/auth/login", input);
    return res;
  };

  const logout = async () => {
    await Api.post("/auth/logout");
    Cookies.remove("access_token");
  };

  // useEffect(() => {
  //   localStorage.setItem("user", JSON.stringify(currentUser)); // Provide a key for storing the value in localStorage
  // }, [currentUser]); // Add currentUser as a dependency in the dependency array

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
