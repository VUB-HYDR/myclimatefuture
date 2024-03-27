<script lang="ts">
  import H2 from '$lib/ui/H2.svelte';
  import Info from '$lib/Icons/Info.svelte';
  import { createRadioGroup, melt } from '@melt-ui/svelte';

  export let store;
  export let options: any[];
  export let question: string;
  export let emoji: string;

  const {
    elements: { root, item },
    helpers: { isChecked },
  } = createRadioGroup({
    defaultValue: '0',
    value: store,
  });
</script>

<div
  use:melt={$root}
  class="flex flex-col gap-3"
  aria-label={question}
>
  <legend class="label">
    <H2 {emoji}>{question}</H2>
  </legend>
  <div class="grid md:grid-cols-3 gap-4">
    {#each options as { value, label, details, title, isBigText }}
      {@const isChecked = $isChecked(value)}
      <button
        use:melt={$item(value)}
        class="flex aria-checked:text-white items-center justify-center relative px-4 py-3 transition-colors cursor-default rounded-md place-items-center border border-primary-light"
        class:hover:border-primary={!isChecked}
        class:bg-accent={isChecked}
        class:bg-white={!isChecked}
        class:border-accent={isChecked}
        aria-label={title}
        class:relative={Boolean(details)}
        {title}
      >
        <span
          class="font-bold leading-tight"
          class:text-xl={!isBigText}
          class:text-2xl={isBigText}>{label}</span
        >
        {#if details}
          <aside
            class="absolute top-1 right-1"
            class:text-secondary={!isChecked}
          >
            <Info title={details} />
          </aside>
        {/if}
      </button>
    {/each}
  </div>
</div>
