import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ptBR from '@/i18n/locales/pt-BR.json';

export const resources = {
  'pt-BR': {
    translation: ptBR,
  },
};

export const initI18n = (language: string) => {
  const i18nInstanceAlreadyStarted = !!i18n.language;

  if (!i18nInstanceAlreadyStarted) {
    i18n.use(initReactI18next).init({
      compatibilityJSON: 'v3',
      resources,
      lng: language,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });
  }

  return i18n;
};

export default i18n;
