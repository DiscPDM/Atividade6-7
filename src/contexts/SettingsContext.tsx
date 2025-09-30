import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SettingsContextType {
  notifications: boolean;
  layout: 'grid' | 'list';
  toggleNotifications: () => void;
  setLayout: (layout: 'grid' | 'list') => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
};

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [listLayout, setListLayout] = useState<'grid' | 'list'>('list');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedNotifications = await AsyncStorage.getItem('notifications');
      const savedLayout = await AsyncStorage.getItem('layout');
      
      if (savedNotifications !== null) {
        setNotificationsEnabled(savedNotifications === 'true');
      }
      
      if (savedLayout !== null && (savedLayout === 'grid' || savedLayout === 'list')) {
        setListLayout(savedLayout);
      }
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
    }
  };

  const toggleNotifications = async () => {
    try {
      const newValue = !notificationsEnabled;
      setNotificationsEnabled(newValue);
      await AsyncStorage.setItem('notifications', newValue.toString());
    } catch (error) {
      console.error('Erro ao salvar notificações:', error);
    }
  };

  const setLayout = async (newLayout: 'grid' | 'list') => {
    try {
      setListLayout(newLayout);
      await AsyncStorage.setItem('layout', newLayout);
    } catch (error) {
      console.error('Erro ao salvar layout:', error);
    }
  };

  const value: SettingsContextType = {
    notifications: notificationsEnabled,
    layout: listLayout,
    toggleNotifications,
    setLayout,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
