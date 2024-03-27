<script>
  import { ASPECT_RATIOS } from '$config';
  import { CURRENT_ASPECT_RATIO_INDEX } from '$store';

  import { createRadioGroup, melt } from '@melt-ui/svelte';

  const {
    elements: { root, item },
    helpers: { isChecked },
  } = createRadioGroup({
    defaultValue: 'default',
    value: CURRENT_ASPECT_RATIO_INDEX,
  });
</script>

<div
  use:melt={$root}
  class="w-full flex gap-8"
>
  {#each ASPECT_RATIOS as [w, h], i}
    {@const id = String(i)}
    <button
      use:melt={$item(id)}
      class="cursor-default bg-white hover:text-accent text-sm"
      class:text-accent={$isChecked(id)}
      {id}
      aria-labelledby="{id}-label"
    >
      {w}&#8239;:&#8239;{h}
    </button>
  {/each}
</div>
