<script lang="ts">
  import { RISKS_LABELS } from '$config';
  import { CURRENT_ASPECT_RATIO_INDEX_NUMBER, CURRENT_VIS_HEIGHT } from '$store';
  import { LayerCake, Svg } from 'layercake';

  import { scaleBand } from 'd3-scale';

  import Bars from './Bars.svg.svelte';
  import AxisY from './AxisY.svg.svelte';

  export let data;

  export let xKey = 'index';
  export let yKey = 'size';
  export let yDomain: number[];

  export let xDomain = RISKS_LABELS.map((n, i) => i);

  $: paddingTop = 80 * ($CURRENT_ASPECT_RATIO_INDEX_NUMBER == 0 ? 0.7 : 1);
</script>

<div
  class="w-full"
  style={`height: ${Math.max($CURRENT_VIS_HEIGHT, 266)}px;`}
>
  {#if $CURRENT_VIS_HEIGHT}
    <LayerCake
      padding={{
        top: paddingTop,
        bottom: 65,
        left: 5,
        right: 5,
      }}
      x={xKey}
      y={yKey}
      xScale={scaleBand().paddingInner(0.4).paddingOuter(0.2).round(true)}
      {yDomain}
      {xDomain}
      {data}
    >
      <Svg>
        <AxisY />
        <Bars />
      </Svg>
    </LayerCake>
  {/if}
</div>
