<script>
  // Inspired by https://github.com/carbon-design-system/carbon-components-svelte/blob/master/src/RadioButton/RadioButton.svelte
  /** Set to `true` to check the tile */
  export let checked = false;

  /** Specify the value of the radio input */
  export let value = "";

  /** Specify the tabindex */
  export let tabindex = "0";

  /** Specify the ARIA label for the radio tile checkmark icon */
  export let buttonDescription = "";

  /** Set an id for the input element */
  export let id = "ccs-" + Math.random().toString(36);

  /** Specify a name attribute for the input */
  export let name = "";

  import { getContext } from "svelte";

  const { add, update, selectedValue } = getContext("TileGroup");

  add({ value, checked });

  $: checked = value === $selectedValue;
</script>

<input
  type="radio"
  id="{id}"
  name="{name}"
  value="{value}"
  checked="{checked}"
  class:tile-input="{true}"
  class:visually-hidden="{true}"
  on:change
  on:change="{() => {
    update(value);
  }}"
  on:keydown
  on:keydown="{(e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      update(value);
    }
  }}"
/>
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<label
  for="{id}"
  class:tile="{true}"
  class:tile--selectable="{true}"
  class:tile--is-selected="{checked}"
  aria-label={ buttonDescription }
  title={ buttonDescription }
  {...$$restProps}
  on:click
  on:mouseover
  on:mouseenter
  on:mouseleave
>
  <span class:tile-content="{true}">
    <slot />
  </span>
</label>