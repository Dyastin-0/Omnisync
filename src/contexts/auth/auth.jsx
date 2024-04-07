import React, { useEffect, useState, useContext } from "react";

import { auth } from '../../config/firebase';

import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) =>
      initializeUser(user)
    );
    return unsubscribe;
  }, []);

  const initializeUser = async (user) => {
    if (user) {
      setUser({ ...user });
      setIsLoggedIn(true);
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }

    setIsLoading(false);
  }

  const value = {
    user,
    isLoggedIn,
    isLoading
  }

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}