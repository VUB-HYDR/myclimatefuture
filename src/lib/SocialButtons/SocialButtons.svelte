<script>
  import { RAW_PARAMS } from '../../stores.js';
  import { URL_SIMPLE, PAGE_TITLE, HASHTAG, URL, SHARE_BUTTON_TWITTER, SHARE_BUTTON_FACEBOOK, SHARE_BUTTON_TELEGRAM, SHARE_BUTTON_WHATSAPP, SHARE_BUTTON_MAIL } from '../../config.js';
  import { generateShareText } from '../../utils.js';
  import Twitter from "../Icons/Twitter.svelte";
  import Facebook from "../Icons/Facebook.svelte";
  import WhatsApp from "../Icons/WhatsApp.svelte";
  import Mail from "../Icons/Mail.svelte";
  import Telegram from "../Icons/Telegram.svelte";

  let params;
  RAW_PARAMS.subscribe(value => { params = value; });

  $: text_pure = generateShareText(...params, { emojis: false });
  $: text_default = generateShareText(...params, {});
  $: text_short = generateShareText(...params, { url: false, include_commas: false, is_long_region: false, is_long_spelling: false });
  $: text_mail = generateShareText(...params, { url: true, long_url: true });

  $: fb = `https://www.facebook.com/sharer/sharer.php?u=${URL_SIMPLE}&quote=${text_pure}&hashtag=${HASHTAG}`
  $: tw = `https://twitter.com/intent/tweet?url=${URL_SIMPLE}&text=${text_short}`
  $: tg = `https://t.me/share/url?url=${URL}&text=${text_default}`
  $: wa = `https://api.whatsapp.com/send?text=${text_pure}`
  $: mail = `mailto:?subject=${PAGE_TITLE}&body=${text_mail}`
</script>

<div class="page-social-buttons">
  <ul>
    <li><a href={tw} target="_blank" rel="noopener noreferrer" title={ SHARE_BUTTON_TWITTER }><Twitter /></a></li>
    <li><a href={fb} target="_blank" rel="noopener noreferrer" title={ SHARE_BUTTON_FACEBOOK }><Facebook /></a></li>
    <li><a href={tg} target="_blank" rel="noopener noreferrer" title={ SHARE_BUTTON_TELEGRAM }><Telegram /></a></li>
    <li><a href={wa} target="_blank" rel="noopener noreferrer" title={ SHARE_BUTTON_WHATSAPP }><WhatsApp /></a></li>
    <li><a href={mail} rel="noopener noreferrer" title={ SHARE_BUTTON_MAIL }><Mail /></a></li>
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
    @include reset();
  }

  @include query($medium) {
    grid-column: 2 / span 2;
  }
}

</style>
