<script>
  import { CURRENT_ASPECT_RATIO_INDEX, CURRENT_YEAR, CURRENT_TEMPERATURE_INDEX, CURRENT_REGION_INDEX } from '../../stores.js';
  import { DEFAULT_REGION, DEFAULT_ASPECT_RATIO, ASPECT_RATIOS, NUMBER_OF_YEARS, LAST_YEAR, DEFAULT_AGE, TEMPERATURES, REGIONS } from '../../config.js';
  import ButtonGroup from "../ButtonGroup/ButtonGroup.svelte";
  import RadioButton from "../ButtonGroup/RadioButton.svelte";
</script>

<ButtonGroup legend={false} bind:selected={$CURRENT_ASPECT_RATIO_INDEX}>
  <div class="grid-third--fixed" slot="options">
    {#each ASPECT_RATIOS as [w, h], i}
    <RadioButton value={i} checked={i === DEFAULT_ASPECT_RATIO} class="tile--simple">
      <span>{w}&#8239;:&#8239;{h}</span>
    </RadioButton>
    {/each}
  </div>
</ButtonGroup>