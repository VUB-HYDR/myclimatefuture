<script>
  import { LABELS_RISKS } from '$store';
  import { getContext } from 'svelte';
  import { splitIntoEvenChunks } from '$utils';

  const { data, xGet, yGet, xScale, width, y, yRange, xRange } = getContext('LayerCake');

  $: barWidth = $xScale.bandwidth();

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  $: labels = $LABELS_RISKS.map((label) => splitIntoEvenChunks(capitalizeFirstLetter(label), 2));

  $: columnHeight = (d) => {
    return $yRange[0] - $yGet(d);
  };
</script>

{#each $data as d, n}
  {@const colHeight = columnHeight(d)}
  {@const xPos = $xGet(d)}
  <g class="bar">
    <rect
      x={xPos}
      y={$yGet(d)}
      height={colHeight}
      data-value={$y(d)}
      width={barWidth}
      class="fill-accent"
    ></rect>
    <text
      x={xPos + barWidth / 2}
      y={$yGet(d) - 10}
      text-anchor="middle"
      class="values">{d.str}&times;</text
    >
    <text
      x={xPos + barWidth / 2}
      y={$yRange[0] + 15}
      text-anchor="middle"
      class="labels"
    >
      {#each labels[n] as label, i}
        <tspan
          x={$xGet(d) + barWidth / 2}
          dy={i > 0 ? ($width <= 600 ? 14 : 15) : 0}>{label}</tspan
        >
      {/each}
    </text>
  </g>
{/each}
<line
  class="base"
  x1={$xRange[0]}
  x2={$xRange[1]}
  y1={$yRange[0]}
  y2={$yRange[0]}
/>

<style lang="scss">
  @import '../../styles/global.scss';

  .base {
    stroke: var(--primary-color);
  }

  rect {
    transition: fill var(--transition);
  }

  .labels {
    font-size: var(--size-7);

    @include query($narrow) {
      font-size: var(--size-6);
    }
  }

  .values {
    font-size: var(--size-5);
    font-weight: var(--weight-bold);
    fill: var(--primary-color);
  }
</style>
