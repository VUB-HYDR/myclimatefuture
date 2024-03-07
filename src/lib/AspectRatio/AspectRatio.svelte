<script>
  import { ASPECT_RATIOS, DEFAULT_ASPECT_RATIO } from '$config';
  import { CURRENT_ASPECT_RATIO_INDEX } from '$store';
  import ButtonGroup from '../ButtonGroup/ButtonGroup.svelte';
  import RadioButton from '../ButtonGroup/RadioButton.svelte';
</script>

<ButtonGroup legend={false} bind:selected={$CURRENT_ASPECT_RATIO_INDEX}>
  <div class="w-full grid grid-cols-3 gap-8" slot="options">
    {#each ASPECT_RATIOS as [w, h], i}
      <RadioButton value={i} checked={i === DEFAULT_ASPECT_RATIO} class="tile--simple">
        <span>{w}&#8239;:&#8239;{h}</span>
      </RadioButton>
    {/each}
  </div>
</ButtonGroup>
