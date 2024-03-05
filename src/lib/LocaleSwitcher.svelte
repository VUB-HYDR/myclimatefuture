<script lang="ts">
  import { t, locales, locale } from '$lib/translations';
  import Chevron from '$lib/Icons/Chevron.svelte';
  import Check from '$lib/Icons/Check.svelte';
  import { createSelect, melt, type CreateSelectProps } from '@melt-ui/svelte';
  import { fade } from 'svelte/transition';

  const handleChange: CreateSelectProps['onSelectedChange'] = ({ next }) => {
    if (next?.value !== $locale) {
      locale.set(next?.value);
    }
    return next;
  };

  const {
    elements: { trigger, menu, option, label },
    states: { selectedLabel, open, selected },
    helpers: { isSelected },
  } = createSelect<string>({
    forceVisible: true,
    defaultSelected: { value: $locale, label: $t(`lang.${$locale}`) },
    onSelectedChange: handleChange,
    positioning: {
      placement: 'bottom',
      fitViewport: true,
      sameWidth: true,
    },
  });

  $: {
    if ($selected?.value !== $locale) {
      selected.set({ value: $locale, label: $t(`lang.${$locale}`) ?? $locale });
    }
  }
</script>

<div class="flex flex-col gap-1">
  <!-- svelte-ignore a11y-label-has-associated-control - $label contains the 'for' attribute -->
  <label class="block text-red-900" use:melt={$label}>Language:</label>
  <button
    class="flex h-10 min-w-[220px] items-center justify-between rounded-lg bg-gray-50 px-3 py-2
  text-red-700 shadow transition-opacity hover:opacity-90"
    use:melt={$trigger}
    aria-label="Food"
  >
    {$selectedLabel || 'Select a flavor'}
    <Chevron class="size-5" />
  </button>
  {#if $open}
    <div class=" z-10 flex max-h-[300px] flex-col overflow-y-auto rounded-lg bg-gray-50 p-1 shadow focus:!ring-0" use:melt={$menu} transition:fade={{ duration: 150 }}>
      {#each $locales as value}
        <div class="relative cursor-pointer rounded-lg py-1 pl-8 pr-4 text-neutral-800 hover:bg-red-100 focus:z-10 focus:text-red-700 data-[highlighted]:bg-red-200 data-[highlighted]:text-red-900 data-[disabled]:opacity-50" use:melt={$option({ value: value, label: $t(`lang.${value}`) })}>
          <div class="check {$isSelected(value) ? 'block' : 'hidden'}">
            <Check class="size-4" />
          </div>

          {$t(`lang.${value}`)}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style lang="postcss">
  .check {
    position: absolute;
    left: theme(spacing.2);
    top: 50%;
    z-index: theme(zIndex.20);
    translate: 0 calc(-50% + 1px);
    color: theme(colors.red.500);
  }
</style>
