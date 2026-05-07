import { createContext, useContext } from 'react';
import es from './es.json';
import en from './en.json';

const dict = { es, en };

export const LangContext = createContext('es');

export function useLang() {
  return useContext(LangContext);
}

export function useT() {
  const lang = useLang();
  return (key, params) => {
    let text = (dict[lang] || dict.es)[key];
    if (!text) return key;
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        text = text.replace(`{${k}}`, String(v));
      }
    }
    return text;
  };
}
