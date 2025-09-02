import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files trực tiếp
import enTranslation from './locales/en/translation.json';
import enUSTranslation from './locales/en-US/translation.json';
// Thêm các ngôn ngữ khác nếu có

const resources = {
    en: {
        translation: enTranslation
    },
    'en-US': {
        translation: enUSTranslation
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;