import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, vn } from './listLangs';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        fallbackLng: 'en',
        debug: false,
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false,
        },
        // lng: selectedLanguage || 'vn',
        resources: {
            en,
            vn,
        },
    });

export default i18n;
