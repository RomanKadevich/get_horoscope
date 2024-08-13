import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import WebApp from '@twa-dev/sdk'
import { LanguageProvider } from './context/LanguageContext.tsx'

WebApp.ready();
WebApp.BackButton.show();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <LanguageProvider>
    <App />
    </LanguageProvider>
  </React.StrictMode>,
)
