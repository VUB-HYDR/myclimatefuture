<script>
  import { VALUES, CURRENT_TEMPERATURE, CURRENT_AGE, CURRENT_REGION, CURRENT_REGION_INDEX } from '../../stores.js';
  import { ID_TEXT, RISKS_LABELS, RISKS_EMOJIES, URL_SIMPLE, HASHTAG, URL } from '../../config.js';
  import { getAgeArticle, getAgeText } from '../../utils.js';
  import CopyButton from "../CopyButton/CopyButton.svelte";

  let data;
  VALUES.subscribe(value => { data = value; });
  let temperature;
  CURRENT_TEMPERATURE.subscribe(value => { temperature = value; });
  let age;
  CURRENT_AGE.subscribe(value => { age = value; });
  let region;
  CURRENT_REGION.subscribe(value => { region = value; });
  let region_index;
  CURRENT_REGION_INDEX.subscribe(value => { region_index = value; });

  $: ageArticle = getAgeArticle(age);
  $: ageText = getAgeText(age);
</script>

<div class="page-text">
  <span id={ID_TEXT}  aria-live="polite">
    In a <strong class="em">{ temperature }°C</strong> world, I, as { ageArticle } <strong class="em">{ ageText }</strong>{#if region_index > 0}&nbsp;from <strong class="em">{ region }</strong>{/if}, will experience<br />
    {#each RISKS_LABELS as label, i}
    { RISKS_EMOJIES[i] } <strong>{ label.toLowerCase()} { data[i] }×{ i < RISKS_LABELS.length - 2 ? ',' : '' }{ i === RISKS_LABELS.length - 2 ? ' and' : '' }</strong><br />
    {/each}
    more than without climate change.<br />
    #{ HASHTAG }<br />
    Do the test 👉 <a href={ URL } target="_blank" rel="noopener noreferrer">{ URL_SIMPLE }</a><br />
  </span>
  <CopyButton />
</div>

<style lang="scss">
@import '../../styles/global.scss';

.page-text {
  @include drop-border();
  position: relative;
  display: flex;
  align-items: center;

  @include query($medium) {
    grid-column: 1 / span 3;
  }
}
</style>
