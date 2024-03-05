<script lang="ts">
  import Header from '$lib/Layout/Header.svelte';
  import { CURRENT_TEMPERATURE_INDEX } from '$store';
  import { t } from '$lib/translations';
  import 'tippy.js/dist/tippy.css';
  import '../styles/app.scss';
  import '../app.css';

  // This is used to change the color sheme of the website depending on the selected warming level
  let temperature_index: string;
  CURRENT_TEMPERATURE_INDEX.subscribe((value: number): void => {
    temperature_index = `level-${value}`;
  });

  /** @type { import('./$types').LayoutData } */
  export let data;
</script>

<Header />

<main class={`wrapper ${temperature_index}`} style="--color-accent: var(--color-accent-{$CURRENT_TEMPERATURE_INDEX})">
  <slot />
</main>

<footer class="page-footer wrapper">
  <p class="column">{$t('content.COPYRIGHT')} 2021. {$t('content.AUTHOR_DESIGN')} <a target="_blank" rel="noopener noreferrer author" href="https://jonasparnow.com" class="quiete">Jonas Parnow</a>. {$t('content.SOURCE_CODE')} <a target="_blank" rel="noopener noreferrer" href="https://github.com/VUB-HYDR/myclimatefuture" class="quiete">Github</a>.</p>
</footer>

<style lang="scss">
  @import '../styles/global.scss';

  main {
    display: grid;
    grid-row-gap: var(--size-vertical-outer-gap);
    justify-content: center;
    justify-items: center;
  }

  .page-footer {
    display: flex;
    flex-direction: column;
    margin-top: var(--size-vertical-inner-gap);
    margin-bottom: var(--size-vertical-inner-gap);
    align-items: center;
  }
</style>
