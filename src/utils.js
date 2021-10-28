import { get } from 'lodash-es';
import { REGIONS, REGIONS_SHORT, AGES_WITH_AN, EMOJI_AGES, RISKS_LABELS, RISKS_EMOJIES, HASHTAG, URL_SIMPLE, URL } from './config.js';

export function getValue (data, region, risk, temperature, age) {
	return get(data, [region, risk, temperature, age], 0);
}

export function getAgeArticle (age) {
	return AGES_WITH_AN.includes(age) ? 'an' : 'a';
}

export function getAgeText (age) {
	return age === 0 ? 'newborn' : `${age}-year-old`;
}

export function getAgeEmoji (age) {
	return EMOJI_AGES.find(([a]) => a > age)[1];
}

export function generateShareText (temperature, age, region_index, values, params) {
	const { emojis = true, url = true, is_long_region = true, include_commas = true, long_url = false, is_long_spelling = true } = params;
	const long_region = REGIONS[region_index];
	const short_region = REGIONS_SHORT[region_index];

	let list = '';
	RISKS_LABELS.forEach((label, i) => {
		let end = '';
		if (include_commas && i !== 0) {
			end = i === RISKS_LABELS.length - 1 ? ' and' : ','
		}
		list += `${ end }
${emojis ? RISKS_EMOJIES[i] : ''} ${ label.toLowerCase() } ${ values[i] }×`
	})

	return encodeURIComponent(`In a ${temperature}°C world, I, as ${getAgeArticle(age)} ${getAgeText(age)}${region_index !== 0 ? ` from ${is_long_region ? long_region : short_region}` : ''}, will experience${list}
more than ${ !is_long_spelling && region_index !== 0 ? 'w/o' : 'without' } climate change.
#${HASHTAG}${url ? `
Do the test ${ emojis ? '👉' : 'at'} ${long_url ? URL : URL_SIMPLE}` : ''}`);
}
