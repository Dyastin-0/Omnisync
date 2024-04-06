import React, { useEffect, useState, useContext } from "react";

import { auth } from '../../config/firebase';

import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
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
      setLoggedIn(true);
    } else {
      setUser(null);
      setLoggedIn(false);
    }

    setLoading(false);
  }

  const value = {
    user,
    loggedIn,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}