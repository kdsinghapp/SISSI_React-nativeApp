import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { language } from './constant/Language';
 
const translations = language;

const LanguageContext = createContext<any>(null);

export const LanguageProvider = ({ children }: any) => {
  const [locale, setLocale] = useState('fi'); // Default to Finnish

  // Load saved language preference on app start
  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem('userLanguage');
      if (savedLanguage) setLocale(savedLanguage);
    };
    loadLanguage();
  }, []);

  const changeLanguage = async (newLocale: string) => {
    setLocale(newLocale);
    await AsyncStorage.setItem('userLanguage', newLocale);
  };

   // const labels = translations[locale] || translations['en'];
  const labels =  translations['en'];

  return (
    <LanguageContext.Provider value={{ labels, locale, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for easy usage
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};