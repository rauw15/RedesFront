// src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true); // Aquí pondrías tu lógica de autenticación
  };

  const logout = () => {
    setIsAuthenticated(false); // Aquí pondrías tu lógica de logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
