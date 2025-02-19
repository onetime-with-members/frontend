import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import enJson from './locales/en/en.json';
import koJson from './locales/ko/ko.json';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translation: enJson,
      },
      ko: {
        translation: koJson,
      },
    },
    supportedLngs: ['en', 'ko'],
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
