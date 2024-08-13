// src/ZodiacCard.tsx
import React, { useContext, useState } from 'react';
import { LanguageContext } from './LanguageContext';
import { ZodiacSign } from './consts';
// import { HoroscopeResponse } from './types';

type ZodiacSignProps = {
    sign:ZodiacSign;
};

const ZodiacCard: React.FC<ZodiacSignProps> = ({ sign }) => {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error('LanguageContext must be used within a LanguageProvider');
    }

    const { language } = context;
    const [horoscope, setHoroscope] = useState<string | null>(null);

    const fetchHoroscope = async () => {
        try {
            const body = JSON.stringify({
                sign: sign.sign.toLowerCase(),
                language: language === 'en' ? 'translated' : 'original',
            });

            const response = await fetch('https://poker247tech.ru/get_horoscope/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body,
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch: ${response.statusText}`);
            }

            const data = await response.json();

        
            if (data) {
                setHoroscope(data.horoscope);
            } else {
                console.log(data)
                console.log(sign.sign.toLowerCase())
                setHoroscope('Horoscope not available for this sign.');
            }
        } catch (error) {
            console.error('Error fetching horoscope:', error);
            setHoroscope('Failed to load horoscope. Please try again later.');
        }
    };

    return (
        <div className="zodiac-card" onClick={fetchHoroscope}>
        <div className="icon">{sign.icon}</div>
        {language === 'en'?(<div className="name">{sign.nameEn}</div>):(<div className="name">{sign.nameRu}</div>)}
        {language === 'en'?(<div className="period">{sign.periodEn}</div>):(<div className="period">{sign.periodRu}</div>)}
            {horoscope && <div className="horoscope">{horoscope}</div>}
        </div>
    );
};

export default ZodiacCard;
