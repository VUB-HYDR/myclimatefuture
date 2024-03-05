import i18n from 'sveltekit-i18n';
import lang from './lang.json';

/** @type {import('sveltekit-i18n').Config} */
export const config = {
  translations: {
    en: { lang },
    fr: { lang },
    it: { lang },
    nl: { lang },
  },
  loaders: [
    {
      locale: 'en',
      key: 'content',
      loader: async () => (await import('./en/index.json')).default,
    },
    {
      locale: 'fr',
      key: 'content',
      loader: async () => (await import('./fr/index.json')).default,
    },
    {
      locale: 'it',
      key: 'content',
      loader: async () => (await import('./it/index.json')).default,
    },
    {
      locale: 'nl',
      key: 'content',
      loader: async () => (await import('./nl/index.json')).default,
    },
  ],
};

export const { t, loading, locales, locale, loadTranslations } = new i18n(config);

loading.subscribe(($loading) => $loading && console.log('Loading translations...'));
