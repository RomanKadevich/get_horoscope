import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { Horoscopes, url, ZodiacSignProps } from "../constants/types";
import { useSwipeable } from "react-swipeable";
import { BackButton } from "@vkruglikov/react-telegram-web-app";

const ZodiacCard = ({ sign }: ZodiacSignProps) => {
  const handlers = useSwipeable({
    onSwipedRight: () => alert("Swiped right!"),
  });
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("LanguageContext must be used within a LanguageProvider");
  }

  const { language } = context;
  const [horoscope, setHoroscope] = useState<Horoscopes | string>("");
  const [fetchedHoroscopes, setFetchedHoroscopes] = useState<Horoscopes>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchHoroscope = async () => {
    setIsLoading(true);
    
    try {
      const body = JSON.stringify({
        sign: sign.sign.toLowerCase(),
        language: language === "en" ? "translated" : "original",
      });

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      const data = await response.json();

      if (data && data.horoscope) {
        setFetchedHoroscopes((prev) => ({
          ...prev,
          [sign.sign.toLowerCase()]: data.horoscope,
        }));
        setHoroscope(data);
      } else {
        setHoroscope("Horoscope not available for this sign.");
      }
    } catch (error) {
      console.error("Error fetching horoscope:", error);
      setHoroscope("Failed to load horoscope. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (typeof horoscope === "object") {
      if (fetchedHoroscopes[horoscope.sign]) {
        fetchHoroscope();
      }
    }
  }, [language]);

  return (
    <div {...handlers} className="zodiac-card" onClick={fetchHoroscope}>
      <BackButton onClick={() => setHoroscope("")} />
      <div className="icon">{sign.icon}</div>
      {language === "en" ? (
        <div className="name">{sign.nameEn}</div>
      ) : (
        <div className="name">{sign.nameRu}</div>
      )}
      {language === "en" ? (
        <div className="period">{sign.periodEn}</div>
      ) : (
        <div className="period">{sign.periodRu}</div>
      )}
      {isLoading ? (
        <div className="loading">
          {language === "en" ? "Loading..." : "Загрузка..."}
        </div>
      ) : (
        <div className="horoscope">
          {typeof horoscope === "object" ? horoscope.horoscope : ""}
        </div>
      )}
    </div>
  );
};

export default ZodiacCard;
