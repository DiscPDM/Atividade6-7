import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  colors: {
    background: string;
    surface: string;
    text: string;
    primary: string;
    secondary: string;
    border: string;
  };
}

const lightColors = {
  background: '#ffffff',
  surface: '#f5f5f5',
  text: '#333333',
  primary: '#1976d2',
  secondary: '#666666',
  border: '#cccccc',
};

const darkColors = {
  background: '#121212',
  surface: '#1e1e1e',
  text: '#ffffff',
  primary: '#90caf9',
  secondary: '#b0b0b0',
  border: '#333333',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme !== null) {
        setDarkMode(savedTheme === 'dark');
      }
    } catch (error) {
      console.error('Erro ao carregar tema:', error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !darkMode;
      setDarkMode(newTheme);
      await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Erro ao salvar tema:', error);
    }
  };

  const colors = darkMode ? darkColors : lightColors;

  const value: ThemeContextType = {
    isDark: darkMode,
    toggleTheme,
    colors,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
