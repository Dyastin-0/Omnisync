import React, { createContext, useContext, useEffect, useState } from 'react';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [areDevicesIncluded, setAreDevicesIncluded] = useState(false);
  const [areInactiveDaysIncluded, setAreInactiveDaysIncluded] = useState(false);
  
  const toggleIncludeDevice = () => {
    const current = !areDevicesIncluded;
    setAreDevicesIncluded(current);
    localStorage.setItem('areDevicesIncluded', current);
  };

  const toggleIncludeInactiveDays = () => {
    const current = !areInactiveDaysIncluded;
    setAreInactiveDaysIncluded(current);
    localStorage.setItem('areInactiveDaysIncluded', current);
  }

  useEffect(() => {
    const deviceIncluded = localStorage.getItem('areDevicesIncluded');
    const inactiveDaysIncluded = localStorage.getItem('areInactiveDaysIncluded');
    if (deviceIncluded !== null) {
      setAreDevicesIncluded(deviceIncluded === 'true');
    }
    if (inactiveDaysIncluded !== null) {
      setAreInactiveDaysIncluded(inactiveDaysIncluded === 'true');
    }
  }, []);


  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    theme === 'dark' ? darkTheme() : lightTheme();
  }, [theme]);

  const lightTheme = () => {
    document.documentElement.style.setProperty('--base-color', 'rgb(220, 220, 220)');
    document.documentElement.style.setProperty('--secondary-color', 'rgb(200, 200, 200)');
    document.documentElement.style.setProperty('--text-color', 'rgb(60, 60, 60)');
    document.documentElement.style.setProperty('--complement', 'rgb(210, 210, 210)');
  };


  const darkTheme = () => {
    document.documentElement.style.setProperty('--base-color', 'rgb(35, 35, 35)');
    document.documentElement.style.setProperty('--secondary-color', 'rgb(45, 45, 45)');
    document.documentElement.style.setProperty('--text-color', 'rgb(255, 255, 255)');
    document.documentElement.style.setProperty('--complement', 'rgb(25, 25, 25)');
  };

  const value = {
    theme,
    toggleTheme,
    areDevicesIncluded,
    toggleIncludeDevice,
    areInactiveDaysIncluded,
    toggleIncludeInactiveDays
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
