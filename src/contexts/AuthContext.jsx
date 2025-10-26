import React, { createContext, useState, useEffect } from 'react';
import { isLoggedIn as checkIsLoggedIn } from '../utils/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(checkIsLoggedIn());

  const login = (user) => {
    localStorage.setItem('ticketapp_session', JSON.stringify(user));
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('ticketapp_session');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};