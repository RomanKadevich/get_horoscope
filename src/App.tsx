
import { useContext } from 'react';
import './App.css'

// import WebApp from '@twa-dev/sdk'
import { LanguageContext } from './LanguageContext';
import ZodiacBox from './ZodiacBox';

const App=() =>{

  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('LanguageContext must be used within a LanguageProvider');
}
type ZodiacSign = {
  name: string;
  period: string;
  icon: string;
};

const zodiacSignsEng: ZodiacSign[] = [
  { name: 'Aries', period: 'Mar 21 - Apr 19', icon: '♈' },
  { name: 'Taurus', period: 'Apr 20 - May 20', icon: '♉' },
  { name: 'Gemini', period: 'May 21 - Jun 20', icon: '♊' },
  { name: 'Cancer', period: 'Jun 21 - Jul 22', icon: '♋' },
  { name: 'Leo', period: 'Jul 23 - Aug 22', icon: '♌' },
  { name: 'Virgo', period: 'Aug 23 - Sep 22', icon: '♍' },
  { name: 'Libra', period: 'Sep 23 - Oct 22', icon: '♎' },
  { name: 'Scorpio', period: 'Oct 23 - Nov 21', icon: '♏' },
  { name: 'Sagittarius', period: 'Nov 22 - Dec 21', icon: '♐' },
  { name: 'Capricorn', period: 'Dec 22 - Jan 19', icon: '♑' },
  { name: 'Aquarius', period: 'Jan 20 - Feb 18', icon: '♒' },
  { name: 'Pisces', period: 'Feb 19 - Mar 20', icon: '♓' },
];
const zodiacSignsRus:ZodiacSign[]  = [
  { name: 'Овен', period: '21 марта - 19 апреля', icon: '♈' },
  { name: 'Телец', period: '20 апреля - 20 мая', icon: '♉' },
  { name: 'Близнецы', period: '21 мая - 20 июня', icon: '♊' },
  { name: 'Рак', period: '21 июня - 22 июля', icon: '♋' },
  { name: 'Лев', period: '23 июля - 22 августа', icon: '♌' },
  { name: 'Дева', period: '23 августа - 22 сентября', icon: '♍' },
  { name: 'Весы', period: '23 сентября - 22 октября', icon: '♎' },
  { name: 'Скорпион', period: '23 октября - 21 ноября', icon: '♏' },
  { name: 'Стрелец', period: '22 ноября - 21 декабря', icon: '♐' },
  { name: 'Козерог', period: '22 декабря - 19 января', icon: '♑' },
  { name: 'Водолей', period: '20 января - 18 февраля', icon: '♒' },
  { name: 'Рыбы', period: '19 февраля - 20 марта', icon: '♓' },
];
const { language, toggleLanguage } = context;
return (
  <div className="App">
      <header>
          <button onClick={toggleLanguage}>
              {language === 'en' ? 'Switch to Russian' : 'Переключить на Английский'}
          </button>
      </header>
      <div className="zodiac-grid">
          {language === 'en'?(zodiacSignsEng.map((sign, index) => (
              <ZodiacBox key={index} sign={sign} />
          ))):(zodiacSignsRus.map((sign, index) => (
            <ZodiacBox key={index} sign={sign} />
        )))
          }
      </div>
  </div>
);
}

export default App
