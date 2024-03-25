<script lang="ts">
  import Header from '$lib/Layout/Header.svelte';
  import { CURRENT_TEMPERATURE_INDEX } from '$store';
  import { t, locale } from '$lib/translations';
  import 'tippy.js/dist/tippy.css';
  import '../styles/app.scss';
  import '../app.scss';

  // This is used to change the color sheme of the website depending on the selected warming level
  $: temperatureClass = `level-${$CURRENT_TEMPERATURE_INDEX}`;
</script>

<Header />

<main class="wrapper {temperatureClass}" style="--color-accent: var(--color-accent-{$CURRENT_TEMPERATURE_INDEX})" lang={$locale}>
  <slot />
</main>

<footer class="page-footer wrapper" lang={$locale}>
  <p class="column">{$t('content.COPYRIGHT', { year: new Date().getFullYear() })} {@html $t('content.AUTHOR_DESIGN', { link: '<a href="https://jonasparnow.com" class="quiet">Jonas Parnow</a>' })} {@html $t('content.SOURCE_CODE', { link: '<a href="https://github.com/VUB-HYDR/myclimatefuture" class="quiet">Github</a>' })}</p>
</footer>

<style lang="scss">
  @import '../styles/global.scss';

  main {
    @apply grid gap-y-16 justify-center justify-items-center;
  }

  .page-footer {
    @apply flex flex-col my-8 items-center;
  }
</style>
