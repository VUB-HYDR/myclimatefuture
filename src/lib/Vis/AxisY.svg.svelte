<script>
  import { getContext } from 'svelte';

  const { xRange, yScale, width } = getContext('LayerCake');

  /** @type {Number|Array<number>|Function} [ticks=4] - If this is a number, it passes that along to the [d3Scale.ticks](https://github.com/d3/d3-scale) function. If this is an array, hardcodes the ticks to those values. If it's a function, passes along the default tick values and expects an array of tick values in return. */
  export let ticks = 4;

  $: tickVals = $yScale.ticks(ticks);
</script>

<g class="axis y-axis ticks">
  {#each tickVals as tick (tick)}
    <g
      class="tick tick-{tick}"
      transform="translate({$xRange[0]}, {$yScale(tick)})"
    >
      <line
        class="gridline"
        x2={$width}
      ></line>
    </g>
  {/each}
</g>

<style lang="scss">
  .ticks {
    line {
      stroke: var(--tertiary-color);
    }
  }
</style>
