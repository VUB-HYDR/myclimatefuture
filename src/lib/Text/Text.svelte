<script>
  import { HASHTAG, ID_TEXT, RISKS_EMOJIES, URL, URL_SIMPLE, RISKS_LABELS } from '$config';
  import LL from '$i18n/i18n-svelte';
  import { CURRENT_AGE, CURRENT_REGION, CURRENT_REGION_INDEX, CURRENT_TEMPERATURE, LABELS_RISKS, VALUES } from '$store';
  import CopyButton from '../CopyButton/CopyButton.svelte';

  $: l = RISKS_LABELS.length - 2;

  $: risks = RISKS_LABELS.map((key, i) => {
    return {
      emoji: RISKS_EMOJIES[i],
      label: $LL[key]().toLowerCase(),
      value: $VALUES[i] ?? 0,
      comma: i < l ? ',' : '',
      and: i === l ? ` ${and}` : '',
    };
  });

  $: and = $LL.GRAPHIC_TEXT_2();

  $: text = $CURRENT_REGION_INDEX > 0 ? $LL.GRAPHIC_TEXT_1_REGION({ temp: `${$CURRENT_TEMPERATURE}°C`, age: $CURRENT_AGE, region: $CURRENT_REGION }) : $LL.GRAPHIC_TEXT_1({ temp: `${$CURRENT_TEMPERATURE}°C`, age: $CURRENT_AGE });
</script>

<div class="page-text">
  <span id={ID_TEXT} aria-live="polite">
    {@html text}<br />
    {#each risks as { emoji, label, value, comma, and }}
      {emoji} <em>{@html label} {value}×{comma}{and}</em><br />
    {/each}
    {$LL.GRAPHIC_TEXT_3()}<br />
    #{HASHTAG}<br />
    {$LL.GRAPHIC_TEXT_4()} 👉 <a href={URL} target="_blank" rel="noopener noreferrer">{URL_SIMPLE}</a><br />
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
