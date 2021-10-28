<script>
	import ButtonGroup from "./ButtonGroup/ButtonGroup.svelte";
  import RadioButton from "./ButtonGroup/RadioButton.svelte";
  import Slider from "./Slider/Slider.svelte";
  import Info from "./Icons/Info.svelte";
  import { getAgeEmoji } from '../utils.js';

	import { CURRENT_ASPECT_RATIO_INDEX, CURRENT_YEAR, CURRENT_TEMPERATURE_INDEX, CURRENT_REGION_INDEX, CURRENT_AGE } from '../stores.js';
  import { TEMPERATURES_LABELS, TEMPERATURES_DETAILS, DEFAULT_TEMPERATURE, DEFAULT_REGION, DEFAULT_ASPECT_RATIO, ASPECT_RATIOS, NUMBER_OF_YEARS, LAST_YEAR, DEFAULT_AGE, TEMPERATURES, REGIONS, REGIONS_COUNTRIES, TEMPERATURES_TITLES } from '../config.js';

  let age;
  CURRENT_AGE.subscribe(value => { age = value; });

  $: ageEmoji = getAgeEmoji(age);

  $: listRegions = REGIONS.map((region, i) => {
  	return {
  		value: i,
  		checked: i === DEFAULT_REGION,
  		region,
  		countries: i === 0 ? false : REGIONS_COUNTRIES[i - 1],
  		title: `Click to select ${i === 0 ? '' : 'the ' }${ region } region`,
  		name: `region_${i}`
  	}
  })

  $: listTemperatures = TEMPERATURES.map((temperature, i) => {
  	return {
  		value: i,
  		checked: i === DEFAULT_TEMPERATURE,
  		label: TEMPERATURES_LABELS[i],
  		details: TEMPERATURES_DETAILS[i],
  		title: TEMPERATURES_TITLES[i],
  		name: `temperature_${i}`
  	}
  })
</script>

<section class="input column">
	<Slider
    bind:value={$CURRENT_YEAR}
    min={LAST_YEAR - NUMBER_OF_YEARS}
    max={LAST_YEAR}
    step={1}
    currentAge={age}
  >
  <h2 slot="labelText"><i>{ ageEmoji }</i> When were you born?</h2>
</Slider>
	<ButtonGroup bind:selected={$CURRENT_TEMPERATURE_INDEX}>
		<h2 slot="legend"><i>🌡️</i> Select the warming scenario</h2>
		<div class="grid-third" slot="options">
			{#each listTemperatures as { value, checked, label, details, title, name }}
	    <RadioButton {value} {checked} buttonDescription={title} {name}>
	      <strong class="button_title">{ label }</strong>
	      <Info title={details} />
	    </RadioButton>
	    {/each}
	  </div>
	</ButtonGroup>
	<ButtonGroup legend="Where are you from?" bind:selected={$CURRENT_REGION_INDEX}>
	  <h2 slot="legend"><i>🗺️</i> Where are you from?</h2>
	  <div class="grid-third" slot="options">
	  	{#each listRegions as { value, checked, region, countries, title, name }}
	    <RadioButton {value} {checked} buttonDescription={title} {name}>
	      <strong class:button_title={value === 0} class:button_title--small={value > 0}>{ region }</strong>
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

