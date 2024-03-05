<script>
  // Inspired by https://github.com/carbon-design-system/carbon-components-svelte/blob/master/src/RadioButtonGroup/RadioButtonGroup.svelte
  export let selected = undefined;

  /** Specify the legend text */
  export let legend = true;

  import { createEventDispatcher, setContext } from 'svelte';
  import { writable } from 'svelte/store';

  const dispatch = createEventDispatcher();
  const selectedValue = writable(selected);

  setContext('TileGroup', {
    selectedValue,
    add: ({ checked, value }) => {
      if (checked) {
        selectedValue.set(value);
      }
    },
    update: (value) => {
      selectedValue.set(value);
    },
  });

  $: selected = $selectedValue;
  $: dispatch('select', $selectedValue);
</script>

<fieldset class:tile-group={true} {...$$restProps}>
  {#if legend}
    <legend class:label={true}>
      <slot name="legend" />
    </legend>
  {/if}
  <slot name="options" />
</fieldset>
