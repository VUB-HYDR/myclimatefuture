<script>
  import LL from '$i18n/i18n-svelte';
  import { getAgeEmoji } from '$utils';
  import ButtonGroup from './ButtonGroup/ButtonGroup.svelte';
  import RadioButton from './ButtonGroup/RadioButton.svelte';
  import Info from './Icons/Info.svelte';
  import Slider from './Slider/Slider.svelte';

  import { DEFAULT_REGION, DEFAULT_TEMPERATURE, KEYS_REGIONS, LAST_YEAR, NUMBER_OF_YEARS, REGIONS, TEMPERATURES, TEMPERATURES_LABELS } from '$config';
  import { CURRENT_AGE, CURRENT_REGION_INDEX, CURRENT_TEMPERATURE_INDEX, CURRENT_YEAR } from '$store';

  let age;
  CURRENT_AGE.subscribe((value) => {
    age = value;
  });

  $: ageEmoji = getAgeEmoji(age);

  $: listRegions = REGIONS.map((region, i) => {
    return {
      value: i,
      checked: i === DEFAULT_REGION,
      region: $LL[KEYS_REGIONS[i]](),
      countries: i === 0 ? false : $LL[`${KEYS_REGIONS[i]}_COUNTRIES`](),
      title: `Click to select ${i === 0 ? '' : 'the '}${region} region`,
      name: `region_${i}`,
    };
  });

  $: listTemperatures = TEMPERATURES.map((temperature, i) => {
    return {
      value: i,
      checked: i === DEFAULT_TEMPERATURE,
      label: $LL[TEMPERATURES_LABELS[i]](),
      details: $LL[`${TEMPERATURES_LABELS[i]}_DESCRIPTION`](),
      title: $LL[`${TEMPERATURES_LABELS[i]}_BUTTON`](),
      name: `temperature_${i}`,
    };
  });
</script>

<section class="input column">
  <Slider bind:value={$CURRENT_YEAR} min={LAST_YEAR - NUMBER_OF_YEARS} max={LAST_YEAR} step={1} currentAge={age}>
    <h2 slot="labelText"><i>{ageEmoji}</i> {$LL.QUESTION_AGE()}</h2>
  </Slider>
  <ButtonGroup bind:selected={$CURRENT_TEMPERATURE_INDEX}>
    <h2 slot="legend"><i>🌡️</i> {$LL.QUESTION_SCENARIO()}</h2>
    <div class="grid-third" slot="options">
      {#each listTemperatures as { value, checked, label, details, title, name }}
        <RadioButton {value} {checked} buttonDescription={title} {name}>
          <span class="button_title">{label}</span>
          <Info title={details} />
        </RadioButton>
      {/each}
    </div>
  </ButtonGroup>
  <ButtonGroup legend="Where are you from?" bind:selected={$CURRENT_REGION_INDEX}>
    <h2 slot="legend"><i>🗺️</i> {$LL.QUESTION_LOCATION()}</h2>
    <div class="grid-third" slot="options">
      {#each listRegions as { value, checked, region, countries, title, name }}
        <RadioButton {value} {checked} buttonDescription={title} {name}>
          <span class:button_title={value === 0} class:button_title--small={value > 0}>{region}</span>
          {#if countries}
            <Info title={countries} />
          {/if}
        </RadioButton>
      {/each}
    </div>
  </ButtonGroup>
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
