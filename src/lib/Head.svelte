<script>
  import { HASHTAG } from '$config';
  import { t, locales, locale } from '$lib/translations';
  import LocaleSwitcher from '$lib/LocaleSwitcher.svelte';
  // import LocaleSwitcher from './i18n/LocaleSwitcher.svelte';
</script>

<header class="page-header grid-half column">
  <span class="text-xs text-accent">#{HASHTAG}</span>
  <h1 class="col-span-2 col-start-1 mb-4 text-4xl md:text-5xl lg:text-6xl font-bold hyphens-auto lg:hyphens-none">{$t('content.HEADLINE')}</h1>
  <div class="col-span-2 col-start-1 md:col-span-1">{@html $t('content.INTRODUCTION')}</div>
  <div>
    <LocaleSwitcher />
  </div>
  <div class="center"><span role="alert" class="info">{$t('content.DATA_STORE_MESSAGE')}</span></div>
</header>

<style lang="scss">
  @import '../styles/global.scss';

  .page-header {
    margin-top: calc(var(--spacing-1) * 4);
    margin-bottom: calc(var(--spacing-1) * 2);

    .center {
      text-align: center;
      grid-column: 1 / span 2;
      margin-top: calc(var(--spacing-1));

      @include query($medium) {
        grid-column: 1 / span 1;
      }
    }

    .info {
      padding: calc(var(--spacing-1) / 2) calc(var(--spacing-1) / 1.2);
      background-color: var(--color-info-background);
      border: 1px solid var(--color-info-border);
      border-radius: 2px;
      grid-column: 1 / span 2;

      @include query($medium) {
        grid-column: 1 / span 1;
      }
    }
  }
</style>
