<script>
  // import LL from '$i18n/i18n-svelte';
  import { t, locale } from '$lib/translations';
  import tooltip from '../tooltip.js';
  // Adapted from https://github.com/carbon-design-system/carbon-components-svelte/blob/master/src/Slider/Slider.svelte
  /** Specify the value of the slider */
  export let value = 0;

  /** Set the maximum slider value */
  export let max = 100;

  /** Specify the label for the max value */
  export let maxLabel = '';

  /** Set the minimum slider value */
  export let min = 0;

  /** Specify the label for the min value */
  export let minLabel = '';

  /** Set the step value */
  export let step = 1;

  /** Set the step multiplier value */
  export let stepMultiplier = 4;

  /** Set to `true` to disable the slider */
  export let disabled = false;

  /**
   * Set to `true` for the slider to span
   * the full width of its containing element.
   */
  export let fullWidth = false;

  /** Set an id for the slider div element */
  export let id = 'ccs-' + Math.random().toString(36);

  /**
   * Specify the label text.
   * Alternatively, use the "labelText" slot (e.g., `<span slot="labelText">...</span>`)
   */
  export let labelText = '';

  /** Set to `true` to visually hide the label text */
  export let hideLabel = false;

  /** Obtain a reference to the HTML element */
  export let ref = null;

  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let trackRef = null;
  let dragging = false;
  let holding = false;

  function startDragging() {
    dragging = true;
  }

  function startHolding() {
    holding = true;
  }

  function stopHolding() {
    holding = false;
    dragging = false;
  }

  function move() {
    if (holding) {
      startDragging();
    }
  }

  function calcValue(e) {
    if (disabled) return;

    const offsetX = e.touches ? e.touches[0].clientX : e.clientX;
    const { left, width } = trackRef.getBoundingClientRect();
    let nextValue = min + Math.round(((max - min) * ((offsetX - left) / width)) / step) * step;

    if (nextValue <= min) {
      nextValue = min;
    } else if (nextValue >= max) {
      nextValue = max;
    }

    value = nextValue;
  }

  $: labelId = `label-${id}`;
  $: range = max - min;
  $: left = ((value - min) / range) * 100;
  $: {
    if (value <= min) {
      value = min;
    } else if (value >= max) {
      value = max;
    }

    if (dragging) {
      calcValue(event);
      dragging = false;
    }

    if (!holding && !disabled) {
      dispatch('change', value);
    }
  }

  // $: tooltipContent = $LL.QUESTION_AGE_TOOLTIP({ year: parseInt(value) });
  $: tooltipContent = $t('content.QUESTION_AGE_TOOLTIP', { year: parseInt(value) });
</script>

<svelte:window on:mousemove={move} on:touchmove={move} on:mouseup={stopHolding} on:touchend={stopHolding} on:touchcancel={stopHolding} />

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class:form-item={true} {...$$restProps} on:click on:mouseover on:mouseenter on:mouseleave>
  <label for={id} id={labelId} class:label={true} class:label--disabled={disabled} class:visually-hidden={hideLabel}>
    <slot name="labelText">
      {labelText}
    </slot>
  </label>
  <div class:slider-container={true} style:width={fullWidth && '100%'}>
    <span class:slider__range-label={true}>{minLabel || min}</span>
    <div
      bind:this={ref}
      role="presentation"
      tabindex="-1"
      class:slider={true}
      class:slider--disabled={disabled}
      style:max-width={fullWidth ? 'none' : undefined}
      on:mousedown={startDragging}
      on:mousedown={startHolding}
      on:touchstart={startHolding}
      on:keydown={({ shiftKey, key }) => {
        const keys = {
          ArrowDown: -1,
          ArrowLeft: -1,
          ArrowRight: 1,
          ArrowUp: 1,
        };
        if (keys[key]) {
          value += step * (shiftKey ? range / step / stepMultiplier : 1) * keys[key];
        }
      }}
    >
      <div role="slider" tabindex="0" class:slider__thumb={true} style:left="{left}%" aria-valuemax={max} aria-valuemin={min} aria-valuenow={value} aria-labelledby={labelId} {id} use:tooltip={{ content: tooltipContent, trigger: 'manual', offset: [0, 10], showOnCreate: true, hideOnClick: false, placement: 'top', delay: 500 }} />
      <div bind:this={trackRef} class:slider__track={true} />
      <div class:slider__filled-track={true} style:transform="translate(0, -50%) scaleX({left / 100})" />
    </div>
    <span class:slider__range-label={true}>{maxLabel || max}</span>
  </div>
</div>
