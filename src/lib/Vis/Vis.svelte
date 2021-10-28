<script>
  import { CURRENT_ASPECT_RATIO_INDEX, VALUES, CURRENT_VIS_WIDTH, CURRENT_VIS_HEIGHT, CURRENT_TEMPERATURE, CURRENT_AGE, CURRENT_REGION, CURRENT_REGION_INDEX } from '../../stores.js';
  import { RISKS_LABELS, ID_GRAPH, URL_SIMPLE, ARIA_GRAPHIC_DESCRIPTION } from '../../config.js';
  import { getAgeArticle, getAgeText } from '../../utils.js';
  import { scaleLinear, scaleBand } from 'd3-scale';
  import { get } from 'lodash-es';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';

  let temperature;
  CURRENT_TEMPERATURE.subscribe(value => { temperature = value; });
  let age;
  CURRENT_AGE.subscribe(value => { age = value; });
  let region;
  CURRENT_REGION.subscribe(value => { region = value; });
  let region_index;
  CURRENT_REGION_INDEX.subscribe(value => { region_index = value; });

  $: ageArticle = getAgeArticle(age);
  $: ageText = getAgeText(age);

  const padding = {
    top: 80,
    bottom: 65,
    left: 5,
    right: 5
  }

  const progress = tweened([0, 0, 0, 0, 0, 0], {
    delay: 0,
    duration: 250,
    easing: cubicOut
  });

  let data;
  VALUES.subscribe(value => {
    data = value;
    const max = Math.max(...data);
    progress.set(value.map(d => 1 / max * d));
  });

  let height;
  CURRENT_VIS_HEIGHT.subscribe(value => {
    height = value;
  });

  $: max = Math.max(...data);

  $: base = height - padding.bottom;

  $: x = scaleBand()
    .domain(RISKS_LABELS)
    .range([padding.left, $CURRENT_VIS_WIDTH - padding.right])
    .paddingInner(0.4)
    .paddingOuter(0.2)
    .round(true)

  $: y = scaleLinear()
    .domain([0, 1]).nice()
    .range([base, (padding.top * ($CURRENT_ASPECT_RATIO_INDEX === 0 ? 0.7 : 1))])

  $: xs = x.range();

  $: barWidth = x.bandwidth() || 0;

  $: bars = RISKS_LABELS.map((label, index) => {
    const size = y($progress[index] || 0);
    const value = data[index];
    const x1 = (x(label) || 0);
    return {
      labels: label.split(' '),
      value,
      x: x1,
      cx: x1 + barWidth / 2,
      y: size || 0,
      height: (base - size) || 0,
      title: `The increase in ${ label.toLowerCase() } is ${ value } times.`
    }
  })

  $: ticks = y.ticks(5).map((value, index) => {
    const ys = y(value);
    return {
      x1: xs[0],
      x2: xs[1],
      y1: ys,
      y2: ys,
      value: value * max
    }
  })
</script>

<div class="page-graph" role="img" title={ ARIA_GRAPHIC_DESCRIPTION } aria-label={ ARIA_GRAPHIC_DESCRIPTION } tabindex="0" aria-live="polite">
  <div class="page-graph-wrapper" bind:clientWidth={$CURRENT_VIS_WIDTH} style="height: { height }px" id={ ID_GRAPH }>
    <div class="graph-text" class:compact={$CURRENT_ASPECT_RATIO_INDEX === 0 && region_index !== 0} class:high={$CURRENT_ASPECT_RATIO_INDEX === 2}>
      <p>In a <strong class="em">{ temperature }°C</strong> world, I, as { ageArticle } <strong class="em">{ ageText }</strong>{#if region_index > 0}&nbsp;from <strong class="em">{ region }</strong>{/if}, will experience these increases</p>
    </div>
    <div class="graph-footer">
      <span>Find out your climate future at { URL_SIMPLE }</span>
    </div>
    <svg viewBox={`0 0 ${$CURRENT_VIS_WIDTH} ${height}`} xmlns="http://www.w3.org/2000/svg">
      <g class="ticks">
        {#each ticks as { x1, x2, y1, y2, value }}
        <line x1={x1} x2={x2} y1={y1} y2={y2} />
        {/each}
      </g>
      {#if xs[0] && xs[1]}
      <g>
        {#each bars as { labels, value, x, height, y, cx, title }, i}
        <g class="bar" title={title} aria-label={title} tabindex="0">
          <rect x={x} y={y} height={height} width={barWidth} />
          <text x={cx} y={y - 10} text-anchor="middle" class="values">{ value }&times;</text>
          <text x={cx} y={base + 15} text-anchor="middle" class="labels">
            {#each labels as label, i}
            <tspan x={cx} dy={i * ($CURRENT_VIS_WIDTH <= 600 ? 14 : 15)}>{ label }</tspan>
            {/each}
          </text>
          </g>
        {/each}
      </g>
      <line class="base" x1={xs[0]} x2={xs[1]} y1={base} y2={base} />
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
        box-shadow: 7px 5px var(--pure-white), 0 5px var(--pure-white);
      }
    }

    .graph-footer {
      position: absolute;
      bottom: 0;
      left: 5px;

      span {
        margin: 0;
        color: var(--secondary-color);
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
  fill: var(--color-accent);
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
