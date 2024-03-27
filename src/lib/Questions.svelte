<script>
  import { t } from '$lib/translations';
  import { getAgeEmoji } from '$utils';
  import Slider from './Slider/Slider.svelte';
  import H2 from '$lib/ui/H2.svelte';
  import Selection from '$lib/Questions/Selection.svelte';

  import { KEYS_REGIONS, LAST_YEAR, NUMBER_OF_YEARS, TEMPERATURES, TEMPERATURES_LABELS } from '$config';
  import { CURRENT_AGE, CURRENT_REGION_INDEX, CURRENT_TEMPERATURE_INDEX, CURRENT_YEAR_SLIDER } from '$store';

  $: ageEmoji = getAgeEmoji($CURRENT_AGE);

  $: listRegions = KEYS_REGIONS.map((key, i) => {
    const isWorld = i === 0;
    return {
      value: String(i),
      label: $t(`content.${key}`),
      details: isWorld ? false : $t(`content.${key}_COUNTRIES`),
      title: isWorld ? $t('content.LOCATION_BUTTON_WORLD') : $t('content.LOCATION_BUTTON_REGION', { region: $t(`content.${key}`) }),
      isBigText: i == 0,
    };
  });

  $: listTemperatures = TEMPERATURES.map((temperature, i) => {
    return {
      value: String(i),
      label: $t(`content.${TEMPERATURES_LABELS[i]}`),
      details: $t(`content.${TEMPERATURES_LABELS[i]}_DESCRIPTION`),
      title: $t(`content.${TEMPERATURES_LABELS[i]}_BUTTON`),
      isBigText: i == 0,
    };
  });
</script>

<section class="input column">
  <div>
    <H2
      emoji={ageEmoji}
      slot="labelText">{$t('content.QUESTION_AGE')}</H2
    >
    <Slider
      value={CURRENT_YEAR_SLIDER}
      min={LAST_YEAR - NUMBER_OF_YEARS}
      max={LAST_YEAR}
    />
  </div>
  <Selection
    options={listTemperatures}
    question={$t('content.QUESTION_SCENARIO')}
    emoji="🌡️"
    store={CURRENT_TEMPERATURE_INDEX}
  />
  <Selection
    options={listRegions}
    question={$t('content.QUESTION_LOCATION')}
    emoji="🗺️"
    store={CURRENT_REGION_INDEX}
  />
</section>

<style lang="scss">
  @import '../styles/global.scss';

  .input {
    display: grid;
    grid-row-gap: var(--size-vertical-outer-gap);

    @include query($medium) {
      @include sticky-grid();
    }
  }
</style>
