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
  const [loading, setLoading] = useState(true);

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

    setLoading(false);
  }

  const value = {
    user,
    isLoggedIn,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}