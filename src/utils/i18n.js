i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: process.env.PUBLIC_URL + '/locales/{{lng}}/{{ns}}.json',
        },
    });
