// src/LanguageContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

type LanguageContextType = {
    language: 'en' | 'ru';
    toggleLanguage: () => void;
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<'en' | 'ru'>('en');

    const toggleLanguage = () => {
        setLanguage((prevLang) => (prevLang === 'en' ? 'ru' : 'en'));
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
