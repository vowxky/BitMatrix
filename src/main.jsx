import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LangContext } from './i18n/index.js';
import App from './App.jsx';
import './index.css';

// eslint-disable-next-line react-refresh/only-export-components
function LangRouter() {
  const { pathname } = useLocation();
  const lang = pathname.startsWith('/en') ? 'en' : 'es';

  return (
    <LangContext.Provider value={lang}>
      <App />
    </LangContext.Provider>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/es" element={<LangRouter />} />
        <Route path="/en" element={<LangRouter />} />
        <Route path="*" element={<Navigate to="/es" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
