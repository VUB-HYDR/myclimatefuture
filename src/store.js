import { ASPECT_RATIOS, DEFAULT_AGE, DEFAULT_ASPECT_RATIO, DEFAULT_REGION, DEFAULT_TEMPERATURE, DOWNLOAD_IMAGE_PREFIX, KEYS_REGIONS, LAST_YEAR, RISKS, RISKS_LABELS, TEMPERATURES } from '$config';
import data from '$lib/data/data.json';
import { t, locale } from '$lib/translations';
import { getValue } from '$utils';
import { get, snakeCase } from 'lodash-es';
import { derived, writable } from 'svelte/store';
import { formatLocale } from 'd3-format';

import en from 'd3-format/locale/en-US';
import de from 'd3-format/locale/de-DE';
import it from 'd3-format/locale/it-IT';
import fr from 'd3-format/locale/fr-FR';
import nl from 'd3-format/locale/nl-NL';

const locales = {
  de: de,
  en: en,
  it: it,
  fr: fr,
  nl: nl,
};

export const FORMAT_LOCALE = derived(locale, ($locale) => locales[$locale] ?? en);
export const FORMAT_NUMBER = derived(FORMAT_LOCALE, ($locale) => formatLocale($locale).format('.1f'));

export const CURRENT_YEAR_SLIDER = writable([LAST_YEAR - DEFAULT_AGE]);
export const CURRENT_YEAR = derived(CURRENT_YEAR_SLIDER, ($years) => $years[0]);
export const CURRENT_AGE = derived(CURRENT_YEAR, ($year) => new Date().getFullYear() - $year);
export const CURRENT_REGION_INDEX = writable(DEFAULT_REGION);
export const CURRENT_TEMPERATURE_INDEX = writable(DEFAULT_TEMPERATURE);

export const VALUES = derived([CURRENT_AGE, CURRENT_REGION_INDEX, CURRENT_TEMPERATURE_INDEX, FORMAT_NUMBER], ([$age, $region, $temperature, $format]) => {
  return RISKS.map((r, n) => {
    const value = getValue(data, $region, n, $temperature, $age) ?? 0;
    return [value, $format(value)];
  });
});

export const CURRENT_TEMPERATURE = derived(CURRENT_TEMPERATURE_INDEX, ($index) => get(TEMPERATURES, $index));
export const CURRENT_TEMPERATURE_STRING = derived([CURRENT_TEMPERATURE, FORMAT_NUMBER], ([$value, $format]) => $format($value));
export const CURRENT_REGION = derived([CURRENT_REGION_INDEX, t], ([$index, $t]) => $t(`content.${KEYS_REGIONS[$index]}`));
export const CURRENT_REGION_SHORT = derived([CURRENT_REGION_INDEX, t], ([$index, $t]) => $t(`content.${KEYS_REGIONS[$index]}_SHORT`));
// export const LABELS_RISKS = writable(RISKS_LABELS);
export const LABELS_RISKS = derived(t, ($t) => RISKS_LABELS.map((key) => $t(`content.${key}`)));

export const CURRENT_ASPECT_RATIO_INDEX = writable(ASPECT_RATIOS[DEFAULT_ASPECT_RATIO]);
export const CURRENT_ASPECT_RATIO = derived(CURRENT_ASPECT_RATIO_INDEX, ($index) => get(ASPECT_RATIOS, $index, [1, 1, '']));

export const IMAGE_FILE_NAME = derived([CURRENT_AGE, CURRENT_TEMPERATURE, CURRENT_REGION_SHORT, CURRENT_ASPECT_RATIO], ([$age, $temperature, $region, $ratio]) => {
  return snakeCase(`${DOWNLOAD_IMAGE_PREFIX}-${$age}-${$temperature}-${$region}-${$ratio[2]}`) + '.png';
});

export const CURRENT_VIS_WIDTH = writable(100);
export const CURRENT_VIS_HEIGHT = derived([CURRENT_VIS_WIDTH, CURRENT_ASPECT_RATIO], ([$width, [$ratio_width, $ratio_height]]) => {
  return $width * ($ratio_height / $ratio_width);
});
