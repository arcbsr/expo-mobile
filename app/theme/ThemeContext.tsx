import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Colors } from './themes'; // Adjust the import path if necessary

interface ThemeContextType {
  theme: 'light' | 'dark';
  colors: typeof Colors.light; // Change to the specific type based on theme
  toggleTheme: () => void;
  setDarkTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  const setDarkTheme = () => {
    setTheme('dark');
  };
  const colors = theme === 'light' ? Colors.light : Colors.dark;

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme,setDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
