export type ZodiacSign = {
  sign: string;
  nameEn: string;
  nameRu: string;
  periodEn: string;
  periodRu: string;
  icon: string;
};
export type ZodiacSignProps = {
  sign: ZodiacSign;
};

export type Horoscopes = {
  [key: string]: string;
};
export type LanguageContextType = {
    language: string;
    toggleLanguage: () => void;
};
export const url = "https://poker247tech.ru/get_horoscope/"
