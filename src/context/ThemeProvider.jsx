import { createContext, useContext, useState } from 'react';
 
const ThemeContext = createContext();
 
export const useTheme = () => useContext(ThemeContext);
 
export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
 
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
    document.documentElement.classList.toggle('dark');
  };
 
  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};