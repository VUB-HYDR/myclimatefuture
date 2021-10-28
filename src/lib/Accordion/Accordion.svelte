<script>
  // Adapted from https://github.com/carbon-design-system/carbon-components-svelte/blob/master/src/Accordion/Accordion.svelte
  export let align = "end";

  export let size = undefined;
  /** Set to `true` to disable the accordion */
  export let disabled = false;
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  const disableItems = writable(disabled);
  $: disableItems.set(disabled);
  setContext("Accordion", { disableItems });
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<ul
  class:accordion="{true}"
  class:accordion--start="{align === 'start'}"
  class:accordion--end="{align === 'end'}"
  class:accordion--sm="{size === 'sm'}"
  class:accordion--xl="{size === 'xl'}"
  {...$$restProps}
  on:click
  on:mouseover
  on:mouseenter
  on:mouseleave
>
  <slot />
</ul>

<style>

</style>