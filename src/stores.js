import { writable, readable, derived } from 'svelte/store';
import { get, snakeCase } from 'lodash-es';
import { DOWNLOAD_IMAGE_PREFIX, ASPECT_RATIOS, DEFAULT_ASPECT_RATIO, TEMPERATURES, REGIONS, RISKS, DEFAULT_AGE, DEFAULT_REGION, DEFAULT_TEMPERATURE, LAST_YEAR, REGIONS_SHORT } from './config.js';
import { getValue } from './utils.js';
import data from '$lib/data/data.json';

export const DATA = readable([], async (set) => {
  set(data);
});

export const CURRENT_YEAR = writable(LAST_YEAR - DEFAULT_AGE);
export const CURRENT_AGE = derived(CURRENT_YEAR, ($year) => LAST_YEAR - $year);
export const CURRENT_REGION_INDEX = writable(DEFAULT_REGION);
export const CURRENT_TEMPERATURE_INDEX = writable(DEFAULT_TEMPERATURE);

export const VALUES = derived([DATA, CURRENT_AGE, CURRENT_REGION_INDEX, CURRENT_TEMPERATURE_INDEX], ([$data, $age, $region, $temperature]) => {
  return RISKS.map((r, n) => getValue($data, $region, n, $temperature, $age));
});

export const CURRENT_TEMPERATURE = derived(CURRENT_TEMPERATURE_INDEX, ($index) => get(TEMPERATURES, $index));
export const CURRENT_REGION = derived(CURRENT_REGION_INDEX, ($index) => get(REGIONS, $index));
export const CURRENT_REGION_SHORT = derived(CURRENT_REGION_INDEX, ($index) => get(REGIONS_SHORT, $index));

export const CURRENT_ASPECT_RATIO_INDEX = writable(ASPECT_RATIOS[DEFAULT_ASPECT_RATIO]);
export const CURRENT_ASPECT_RATIO = derived(CURRENT_ASPECT_RATIO_INDEX, ($index) => get(ASPECT_RATIOS, $index, [1, 1, '']));

export const IMAGE_FILE_NAME = derived([CURRENT_AGE, CURRENT_TEMPERATURE, CURRENT_REGION_SHORT, CURRENT_ASPECT_RATIO], ([$age, $temperature, $region, $ratio]) => {
  return snakeCase(`${DOWNLOAD_IMAGE_PREFIX}-${$age}-${$temperature}-${$region}-${$ratio[2]}`) + '.png';
});

export const RAW_PARAMS = derived([CURRENT_AGE, CURRENT_TEMPERATURE, CURRENT_REGION_INDEX, VALUES], ([$age, $temperature, $region_index, $values]) => {
  return [$temperature, $age, $region_index, $values];
});

export const CURRENT_VIS_WIDTH = writable(100);
export const CURRENT_VIS_HEIGHT = derived([CURRENT_VIS_WIDTH, CURRENT_ASPECT_RATIO], ([$width, [$ratio_width, $ratio_height]]) => {
  return $width * ($ratio_height / $ratio_width);
});
