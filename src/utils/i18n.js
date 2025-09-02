import enTranslation from './locales/en/translation.json';
import viTranslation from './locales/vi/translation.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: enTranslation },
            vi: { translation: viTranslation },
        },
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });
