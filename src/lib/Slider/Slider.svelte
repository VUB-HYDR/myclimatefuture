<script lang="ts">
  import { createSlider, melt } from '@melt-ui/svelte';
  import type { Writable } from 'svelte/store';
  import { t } from '$lib/translations';
  import tooltip from '../tooltip.js';

  export let min: number = 0;
  export let max: number = 100;
  export let value: Writable<number[]>;

  const {
    elements: { root, range, thumbs },
  } = createSlider({
    min,
    max,
    step: 1,
    value,
  });

  $: tooltipContent = $t('content.QUESTION_AGE_TOOLTIP', { year: $value[0] });
</script>

<div class="grid grid-cols-[auto_1fr_auto] gap-x-4 items-center">
  <span>{min}</span>
  <span use:melt={$root} class="relative flex h-[20px] w-full items-center">
    <span class="h-[2px] w-full bg-gray-300">
      <span use:melt={$range} class="h-[2px] bg-accent" />
    </span>
    <span use:melt={$thumbs[0]} class="h-4 w-4 transition-transform hover:scale-150 focus:scale-150 rounded-full bg-accent focus:!ring-accent" use:tooltip={{ content: tooltipContent, trigger: 'manual', offset: [0, 10], showOnCreate: true, hideOnClick: false, placement: 'top', delay: 500 }} />
  </span>
  <span>{max}</span>
</div>
