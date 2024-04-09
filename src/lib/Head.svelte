<script>
  import { HASHTAG } from '$config';
  import { t } from '$lib/translations';
  import LocaleSwitcher from '$lib/LocaleSwitcher.svelte';
</script>

<header class="mt-16 mb-8 grid-half gap-y-4 md:gap-y-0 column">
  <span class="text-xs text-accent">#{HASHTAG}</span>
  <h1 class="col-span-2 col-start-1 mb-8 text-4xl md:text-5xl lg:text-6xl font-bold hyphens-auto lg:hyphens-none">{$t('content.HEADLINE')}</h1>
  <div class="col-span-2 col-start-1 md:col-span-1">{@html $t('content.INTRODUCTION')}</div>
  <LocaleSwitcher />
  <div class="col-span-2 col-start-1 md:col-span-1 text-center mt-4">
    <span
      role="alert"
      class="info">{$t('content.DATA_STORE_MESSAGE')}</span
    >
  </div>
</header>

<style lang="scss">
  @import '../styles/global.scss';

  .info {
    padding: calc(var(--spacing-1) / 2) calc(var(--spacing-1) / 1.2);
    background-color: var(--color-info-background);
    border: 1px solid var(--color-info-border);
    border-radius: 2px;
    grid-column: 1 / span 2;
    @apply text-sm;

    @include query($medium) {
      grid-column: 1 / span 1;
    }
  }
</style>
