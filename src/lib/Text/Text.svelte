<script>
  import { t } from '$lib/translations';
  import { HASHTAG, ID_TEXT, RISKS_EMOJIES, RISKS_LABELS } from '$config';
  import { CURRENT_AGE, CURRENT_REGION, CURRENT_REGION_INDEX_NUMBER, VALUES, CURRENT_TEMPERATURE_STRING, LOCALE_URL } from '$store';
  import CopyButton from '../CopyButton/CopyButton.svelte';

  $: l = RISKS_LABELS.length - 2;

  $: risks = RISKS_LABELS.map((key, i) => {
    return {
      emoji: RISKS_EMOJIES[i],
      label: $t(`content.${key}`).toLowerCase(),
      value: $VALUES[i][1] ?? 0,
      comma: i < l ? ',' : '',
      and: i === l ? ` ${and}` : '',
    };
  });

  $: and = $t('content.GRAPHIC_TEXT_2');

  $: text = $CURRENT_REGION_INDEX_NUMBER > 0 ? $t('content.GRAPHIC_TEXT_1_REGION', { temp: $CURRENT_TEMPERATURE_STRING, age: $CURRENT_AGE, region: $CURRENT_REGION }) : $t('content.GRAPHIC_TEXT_1', { temp: $CURRENT_TEMPERATURE_STRING, age: $CURRENT_AGE });
</script>

<div class="page-text">
  <span
    id={ID_TEXT}
    aria-live="polite"
  >
    {@html text}<br />
    {#each risks as { emoji, label, value, comma, and }}
      {emoji} <em>{@html label} {value}×{comma}{and}</em><br />
    {/each}
    {$t('content.GRAPHIC_TEXT_3')}<br />
    #{HASHTAG}<br />
    {$t('content.GRAPHIC_TEXT_4')} 👉
    <a
      href={$LOCALE_URL.href}
      target="_blank"
      rel="noopener noreferrer">{$LOCALE_URL.label}</a
    ><br />
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
