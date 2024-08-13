import { useContext } from "react";
import "./App.css";
import { LanguageContext } from "./context/LanguageContext";
import ZodiacBox from "./components/ZodiacBox";
import { zodiacSigns } from "./constants/constants";

const App = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("LanguageContext must be used within a LanguageProvider");
  }

  const { language, toggleLanguage } = context;

  return (
    <div className="App">
      <header>
        <button onClick={toggleLanguage}>
          {language === "en"
            ? "Switch to Russian"
            : "Переключить на Английский"}
        </button>
      </header>
      <div className="zodiac-grid">
        {zodiacSigns.map((sign, index) => (
          <ZodiacBox key={index} sign={sign} />
        ))}
      </div>
    </div>
  );
};

export default App;
