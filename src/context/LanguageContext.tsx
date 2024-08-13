import React, { createContext, useState, ReactNode } from 'react';
import WebApp from '@twa-dev/sdk'
import { LanguageContextType } from '../constants/types';

const userLanguageCode = WebApp.initDataUnsafe.user?.language_code === "ru" || WebApp.initDataUnsafe.user?.language_code === "en" 
    ? WebApp.initDataUnsafe.user.language_code 
    : "en";

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<string>(userLanguageCode);

    const toggleLanguage = () => {
        setLanguage((prevLang) => (prevLang === 'en' ? 'ru' : 'en'));
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
