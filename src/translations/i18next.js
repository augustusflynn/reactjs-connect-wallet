import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { messages_en, messages_vi } from './index';

const messages = {
  en: messages_en,
  vi: messages_vi,
};

i18next.use(initReactI18next).init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: 'en', // language to use
  resources: {
    en: {
      translation: messages.en, // 'common' is our custom namespace
    },
    vi: {
      translation: messages.vi,
    },
  },
  debug: process.env.NODE_ENV !== 'production',
  fallbackLng: 'en',
});

export default i18next;
