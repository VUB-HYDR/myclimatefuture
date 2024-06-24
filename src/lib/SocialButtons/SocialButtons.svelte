<script>
  import { HASHTAG, PAGE_NAME, RISKS_EMOJIES } from '$config';
  import { t } from '$lib/translations';
  import { CURRENT_AGE, CURRENT_REGION, CURRENT_REGION_INDEX_NUMBER, CURRENT_REGION_SHORT, CURRENT_TEMPERATURE, LABELS_RISKS, VALUES, LOCALE_URL } from '$store';
  import Facebook from '../Icons/Facebook.svelte';
  import Mail from '../Icons/Mail.svelte';
  import Telegram from '../Icons/Telegram.svelte';
  import Twitter from '../Icons/Twitter.svelte';
  import WhatsApp from '../Icons/WhatsApp.svelte';

  $: params = { temp: `${$CURRENT_TEMPERATURE}°C`, age: $CURRENT_AGE };
  $: params_short = { ...params, region: $CURRENT_REGION_SHORT };
  $: params_long = { ...params, region: $CURRENT_REGION };
  $: text_start_short = $CURRENT_REGION_INDEX_NUMBER > 0 ? $t('content.GRAPHIC_TEXT_1_REGION_CLEAN', params_short) : $t('content.GRAPHIC_TEXT_1_CLEAN', params);
  $: text_start_long = $CURRENT_REGION_INDEX_NUMBER > 0 ? $t('content.GRAPHIC_TEXT_1_REGION_CLEAN', params_long) : $t('content.GRAPHIC_TEXT_1_CLEAN', params);
  $: text_and = $t('content.GRAPHIC_TEXT_2');
  $: text_end = $t('content.GRAPHIC_TEXT_3');
  $: text_url = $t('content.GRAPHIC_TEXT_4');

  function generateURL(text, emojis, long_url) {
    return `${text} ${emojis ? '👉' : ''} ${long_url ? $LOCALE_URL.href : $LOCALE_URL.label}`;
  }

  /**
   * Generate a list of risks
   * @param {string[]} labels - The title of the book.
   * @param {number[]} values - Array
   * @param {string} and - Text string for "and"
   * @param {boolean} include_commas - Should the list include commas
   * @param {boolean} include_emojis - Should the list include emojis
   */
  function generateList(labels, values, and, include_commas, include_emojis) {
    let list = [];
    labels.forEach((label, i) => {
      let end = '';
      if (include_commas) {
        if (i < labels.length - 2) {
          end = ',';
        } else if (i === labels.length - 2) {
          end = ` ${and}`;
        }
      }

      list.push(`${include_emojis ? `${RISKS_EMOJIES[i]} ` : ''}${label.replace('&shy;', '')} ${values[i][1]}×${end}`);
    });
    return list;
  }

  function generateText(start, list, end, url) {
    return encodeURIComponent([start, ...list, end, `#${HASHTAG}`, url].filter(Boolean).join('\n'));
  }

  $: text_pure = generateText(text_start_long, generateList($LABELS_RISKS, $VALUES, text_and, true, false), text_end, generateURL(text_url, false, false));
  $: text_default = generateText(text_start_long, generateList($LABELS_RISKS, $VALUES, text_and, true, true), text_end, generateURL(text_url, true, false));
  $: text_short = generateText(text_start_short, generateList($LABELS_RISKS, $VALUES, text_and, false, true), text_end);
  $: text_mail = generateText(text_start_long, generateList($LABELS_RISKS, $VALUES, text_and, true, true), text_end, generateURL(text_url, true, true));

  $: fb = `https://www.facebook.com/sharer/sharer.php?u=${$LOCALE_URL.label}&quote=${text_pure}&hashtag=${HASHTAG}`;
  $: tw = `https://twitter.com/intent/tweet?url=${$LOCALE_URL.label}&text=${text_short}`;
  $: tg = `https://t.me/share/url?url=${$LOCALE_URL.href}&text=${text_default}`;
  $: wa = `https://api.whatsapp.com/send?text=${text_pure}`;
  $: mail = `mailto:?subject=${PAGE_NAME}&body=${text_mail}`;
</script>

<div class="page-social-buttons">
  <ul>
    <li>
      <a
        href={tw}
        target="_blank"
        rel="noopener noreferrer"
        title={$t('content.SHARE_TWITTER')}><Twitter /></a
      >
    </li>
    <li>
      <a
        href={fb}
        target="_blank"
        rel="noopener noreferrer"
        title={$t('content.SHARE_FACEBOOK')}><Facebook /></a
      >
    </li>
    <li>
      <a
        href={tg}
        target="_blank"
        rel="noopener noreferrer"
        title={$t('content.SHARE_TELEGRAM')}><Telegram /></a
      >
    </li>
    <li>
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        title={$t('content.SHARE_WHATSAPP')}><WhatsApp /></a
      >
    </li>
    <li>
      <a
        href={mail}
        rel="noopener noreferrer"
        title={$t('content.SHARE_MAIL')}><Mail /></a
      >
    </li>
  </ul>
</div>

<style lang="scss">
  @import '../../styles/global.scss';

  .page-social-buttons {
    padding: 0 calc(var(--spacing-1) * 1);

    ul {
      list-style: none;
      display: flex;
      justify-content: space-between;
    }

    @include query($medium) {
      grid-column: 2 / span 2;
    }
  }
</style>
