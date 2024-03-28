import { EMOJI_AGES, URL_BASE } from '$config';
import { config as translations } from '$lib/translations';
import { get, trimEnd } from 'lodash-es';

export function getValue(data, region: number, risk: number, temperature: number, age: number) {
  return get(data, [region, risk, temperature, age], 0);
}

export function getAgeEmoji(age: number): string {
  return EMOJI_AGES.find(([a]) => a > age)[1];
}

function splitAtShy(str: string) {
  const parts = str.split('&shy;');
  return parts.map((v, i) => (i < parts.length - 1 && parts.length !== 1 ? `${v}-` : v));
}

// Adapted from here https://stackoverflow.com/questions/33012500/split-string-to-two-will-have-almost-same-length
export function splitIntoEvenChunks(str: string, noOfLines: number = 2) {
  let len = str.length;
  let wordLen = Math.floor(len / noOfLines);

  const lines: string[] = [];
  let temp = '';
  let counter = 0;

  const parts = str
    .split(' ')
    .map((v) => (v.length > wordLen ? splitAtShy(v) : v))
    .flat();

  parts.forEach((v, i) => {
    wordLen = Math.floor((len - lines.join(' ').length) / (noOfLines - counter));

    if ((temp + v).length <= wordLen || i === 0) {
      temp += ' ' + v;
    } else {
      lines.push(temp.trim());
      counter++;
      temp = v;
    }
  });

  temp.trim() && lines.push(temp.trim());
  return lines;
}

// Replaces the locale slug in a URL.
//
// If the `full` argument is set to `true`, the full URL is returned as a string.
// e.g. https://mywebsite.com/en/blog/article-1 => https://mywebsite.com/de/blog/article-1
//
// Otherwise (default) the URL relative to the base is returned.
// e.g. https://mywebsite.com/en/blog/article-1 => /de/blog/article-1

/**
 * @param { URL } url
 * @param { string } locale
 * @param { boolean } full
 * @returns string
 */
export const replaceLocaleInUrl = (url: string, locale: string, full: boolean = false) => {
  const [, , ...rest] = url.pathname.split('/');
  const new_pathname = `/${[locale, ...rest].join('/')}`;
  if (!full) {
    return new_pathname;
  }
  const newUrl = new URL(url.toString());
  newUrl.pathname = new_pathname;
  return newUrl.toString();
};

function generateLocaleURL(locale: string) {
  let base = new URL(URL_BASE);
  let preview = new URL('preview.png', URL_BASE);
  if (locale !== 'en') {
    base = new URL(locale, URL_BASE);
    preview = new URL(`preview-${locale}.png`, URL_BASE);
  }
  return {
    href: base.toString(),
    label: trimEnd(`${base.host}${base.pathname}`, '/'),
    preview: preview.toString(),
  };
}

const LOCALE_URLS = Object.fromEntries(
  Object.keys(translations.translations).map((lang) => {
    return [lang, generateLocaleURL(lang)];
  })
);

export function getLocaleURL(locale: string) {
  return get(LOCALE_URLS, locale, generateLocaleURL(locale));
}
