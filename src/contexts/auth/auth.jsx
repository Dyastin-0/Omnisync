import React, { useEffect, useState, useContext, createContext } from 'react';

import { auth } from '../../config/firebase';
import { onAuthStateChanged, reload } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userDataPath, setUserDataPath] = useState(null);
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
      setUser(user);
      setUserDataPath(`/${user.uid}`);
      setIsLoggedIn(true);
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    user && reload(user);
  }, [user]);

  const value = {
    user,
    userDataPath,
    isLoggedIn,
    isLoading
  }

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}