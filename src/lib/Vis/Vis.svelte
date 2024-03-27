<script>
  import { ID_GRAPH, RISKS_LABELS } from '$config';
  import { t } from '$lib/translations';
  import { CURRENT_AGE, CURRENT_ASPECT_RATIO_INDEX, CURRENT_REGION, CURRENT_REGION_INDEX, CURRENT_TEMPERATURE_STRING, CURRENT_VIS_HEIGHT, CURRENT_VIS_WIDTH, CURRENT_ASPECT_RATIO, LABELS_RISKS, VALUES } from '$store';
  import { splitIntoEvenChunks } from '$utils';
  import { scaleBand, scaleLinear } from 'd3-scale';
  import { capitalize } from 'lodash-es';
  import { cubicOut } from 'svelte/easing';
  import { tweened } from 'svelte/motion';

  const padding = {
    top: 80,
    bottom: 65,
    left: 5,
    right: 5,
  };

  const progress = tweened([0, 0, 0, 0, 0, 0], {
    delay: 0,
    duration: 250,
    easing: cubicOut,
  });

  let max;

  VALUES.subscribe((values) => {
    const numbers = values.map(([num]) => num);
    max = Math.max(...numbers);
    progress.set(numbers.map((d) => (1 / max) * d));
  });

  $: base = $CURRENT_VIS_HEIGHT - padding.bottom;

  $: x = scaleBand()
    .domain(RISKS_LABELS.map((n, i) => i))
    .range([padding.left, $CURRENT_VIS_WIDTH - padding.right])
    .paddingInner(0.4)
    .paddingOuter(0.2)
    .round(true);

  $: y = scaleLinear()
    .domain([0, 1])
    .nice()
    .range([base, padding.top * ($CURRENT_ASPECT_RATIO_INDEX === 0 ? 0.7 : 1)]);

  $: xs = x.range();

  $: barWidth = x.bandwidth() || 0;

  $: bars = $LABELS_RISKS.map((label, index) => {
    const size = y($progress[index] || 0);
    const value = $VALUES[index][0];
    const str = $VALUES[index][1];
    const x1 = x(index) || 0;

    return {
      labels: splitIntoEvenChunks(capitalize(label), 2),
      value,
      str,
      x: x1,
      cx: x1 + barWidth / 2,
      y: size || 0,
      height: base - size || 0,
    };
  });

  $: ticks = y.ticks(5).map((value) => {
    const ys = y(value);
    return {
      x1: xs[0],
      x2: xs[1],
      y1: ys,
      y2: ys,
      value: value * max,
    };
  });

  $: text = $CURRENT_REGION_INDEX > 0 ? $t('content.GRAPHIC_GRAPHIC_TEXT_REGION', { temp: $CURRENT_TEMPERATURE_STRING, age: $CURRENT_AGE, region: $CURRENT_REGION }) : $t('content.GRAPHIC_GRAPHIC_TEXT', { temp: $CURRENT_TEMPERATURE_STRING, age: $CURRENT_AGE });
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
    style="aspect-ratio: {ratio_width} / {ratio_height};"
    id={ID_GRAPH}
  >
    <div
      class="graph-text"
      class:compact={$CURRENT_ASPECT_RATIO_INDEX === 0 && $CURRENT_REGION_INDEX !== 0}
      class:high={$CURRENT_ASPECT_RATIO_INDEX === 2}
    >
      <p>{@html text}</p>
    </div>
    <div class="graph-footer">
      <span>{$t('content.GRAPHIC_LINK')}</span>
    </div>
    <svg
      viewBox={`0 0 ${$CURRENT_VIS_WIDTH} ${$CURRENT_VIS_HEIGHT}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g class="ticks">
        {#each ticks as { x1, x2, y1, y2 }}
          <line
            {x1}
            {x2}
            {y1}
            {y2}
          />
        {/each}
      </g>
      {#if xs[0] && xs[1]}
        <g>
          {#each bars as { labels, str, value, x, height, y, cx }}
            <g class="bar">
              <rect
                {x}
                {y}
                {height}
                width={barWidth}
                class="fill-accent"
              />
              <text
                x={cx}
                y={y - 10}
                text-anchor="middle"
                class="values"
                title={value}>{str}&times;</text
              >
              <text
                x={cx}
                y={base + 15}
                text-anchor="middle"
                class="labels"
              >
                {#each labels as label, i}
                  <tspan
                    x={cx}
                    dy={i > 0 ? ($CURRENT_VIS_WIDTH <= 600 ? 14 : 15) : 0}>{label}</tspan
                  >
                {/each}
              </text>
            </g>
          {/each}
        </g>
        <line
          class="base"
          x1={xs[0]}
          x2={xs[1]}
          y1={base}
          y2={base}
        />
      {/if}
    </svg>
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

  svg {
    width: 100%;
    height: 100%;
  }

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

  .ticks {
    line {
      stroke: var(--tertiary-color);
    }
  }

  .bar {
    &:focus {
      outline: none;

      text {
        fill: var(--color-accent);
      }
    }
  }
</style>
