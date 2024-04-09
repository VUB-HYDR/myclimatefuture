<script>
  import { ID_GRAPH, RISKS_LABELS } from '$config';
  import { t } from '$lib/translations';
  import { LOCALE_URL, CURRENT_AGE, CURRENT_ASPECT_RATIO_INDEX_NUMBER, CURRENT_REGION, CURRENT_REGION_INDEX_NUMBER, CURRENT_TEMPERATURE_STRING, CURRENT_VIS_HEIGHT, CURRENT_VIS_WIDTH, CURRENT_ASPECT_RATIO, LABELS_RISKS, VALUES } from '$store';
  import { cubicOut } from 'svelte/easing';
  import { tweened } from 'svelte/motion';
  import Chart from './Chart.svelte';

  const progress = tweened([0, 0, 0, 0, 0, 0], {
    delay: 0,
    duration: 250,
    easing: cubicOut,
  });

  let max;

  VALUES.subscribe((values) => {
    const numbers = values.map(([num]) => num);
    max = Math.max(...numbers);
    progress.set(numbers.map((num) => (1 / max) * num));
  });

  $: data = $LABELS_RISKS.map((label, index) => {
    return {
      value: $VALUES[index][0],
      str: $VALUES[index][1],
      index,
      size: $progress[index],
    };
  });

  $: text = $CURRENT_REGION_INDEX_NUMBER > 0 ? $t('content.GRAPHIC_GRAPHIC_TEXT_REGION', { temp: $CURRENT_TEMPERATURE_STRING, age: $CURRENT_AGE, region: $CURRENT_REGION }) : $t('content.GRAPHIC_GRAPHIC_TEXT', { temp: $CURRENT_TEMPERATURE_STRING, age: $CURRENT_AGE });
  $: [ratio_width, ratio_height] = $CURRENT_ASPECT_RATIO;
</script>

<div
  class="page-graph"
  role="img"
  title={$t('content.GRAPHIC_DESCRIPTION')}
  aria-label={$t('content.GRAPHIC_DESCRIPTION')}
  aria-live="polite"
>
  <div
    class="page-graph-wrapper"
    bind:clientWidth={$CURRENT_VIS_WIDTH}
    style="w-full aspect-ratio: {ratio_width} / {ratio_height}; height:{Math.max($CURRENT_VIS_HEIGHT, 266)}px;"
    id={ID_GRAPH}
  >
    <div
      class="graph-text z-10"
      class:compact={$CURRENT_ASPECT_RATIO_INDEX_NUMBER == 0 && $CURRENT_REGION_INDEX_NUMBER !== 0}
      class:high={$CURRENT_ASPECT_RATIO_INDEX_NUMBER == 2}
    >
      <p>{@html text}</p>
    </div>
    <div class="graph-footer">
      <span>{$t('content.GRAPHIC_LINK', { link: $LOCALE_URL.label })}</span>
    </div>
    <Chart
      {data}
      yDomain={[0, 1]}
    />
  </div>
</div>

<style lang="scss">
  @import '../../styles/global.scss';

  .page-graph {
    @include drop-border();

    .page-graph-wrapper {
      position: relative;

      .graph-text {
        position: absolute;
        width: 75%;
        left: 5px;

        p {
          background-color: var(--pure-white);
          display: inline;
          margin: 0;
          box-shadow:
            7px 5px var(--pure-white),
            0 5px var(--pure-white);
        }
      }

      .graph-footer {
        position: absolute;
        bottom: 0;
        left: 5px;

        span {
          @apply text-xs m-0 text-secondary;
        }
      }
    }

    @include query($medium) {
      grid-column: 1 / span 3;
    }
  }
</style>
