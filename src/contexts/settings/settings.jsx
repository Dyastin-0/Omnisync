import React, { createContext, useContext, useEffect, useState } from 'react';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

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
    document.documentElement.style.setProperty('--shadow', 'rgba(0, 0, 0, 0.3)');
  };


  const darkTheme = () => {
    document.documentElement.style.setProperty('--base-color', 'rgb(35, 35, 35)');
    document.documentElement.style.setProperty('--secondary-color', 'rgb(45, 45, 45)');
    document.documentElement.style.setProperty('--text-color', 'rgb(255, 255, 255)');
    document.documentElement.style.setProperty('--complement', 'rgb(25, 25, 25)');
    document.documentElement.style.setProperty('--shadow', 'rgba(200, 2000, 2000, 0.3)');
  };

  const value = {
    theme,
    toggleTheme,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
