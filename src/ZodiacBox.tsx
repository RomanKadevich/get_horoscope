// src/ZodiacCard.tsx
import React, { useContext, useState } from 'react';
import { LanguageContext } from './LanguageContext';

type ZodiacSignProps = {
    sign: {
        name: string;
        period: string;
        icon: string;
    };
};

const ZodiacCard: React.FC<ZodiacSignProps> = ({ sign }) => {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error('LanguageContext must be used within a LanguageProvider');
    }

    const { language } = context;
    const [horoscope, setHoroscope] = useState<string | null>(null);

    const fetchHoroscope = async () => {
        const body = JSON.stringify({
            sign: sign.name.toLowerCase(),
            language: language === 'en' ? 'translated' : 'original',
        });

        const response = await fetch('https://poker247tech.ru/get_horoscope/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
        });

        const data = await response.json();
        setHoroscope(data.horoscopes[sign.name.toLowerCase()]);
    };

    return (
        <div className="zodiac-card" onClick={fetchHoroscope}>
            <div className="icon">{sign.icon}</div>
            <div className="name">{sign.name}</div>
            <div className="period">{sign.period}</div>
            {horoscope && <div className="horoscope">{horoscope}</div>}
        </div>
    );
};

export default ZodiacCard;
