<script>
  import { HASHTAG } from '$config';
  import { t, locales, locale } from '$lib/translations';
  // import LocaleSwitcher from './i18n/LocaleSwitcher.svelte';
</script>

<header class="page-header grid-half column">
  <span class="topic">#{HASHTAG}</span>
  <h1 class="page-title">{$t('content.HEADLINE')}</h1>
  <div class="intro">{@html $t('content.INTRODUCTION')}</div>
  <div class="locale-switcher">
    <select bind:value={$locale}>
      {#each $locales as value}
        <option {value}>{$t(`lang.${value}`)}</option>
      {/each}
    </select>
  </div>
  <div class="center"><span role="alert" class="info">{$t('content.DATA_STORE_MESSAGE')}</span></div>
</header>

<style lang="scss">
  @import '../styles/global.scss';

  .page-header {
    margin-top: calc(var(--spacing-1) * 4);
    margin-bottom: calc(var(--spacing-1) * 2);

    .page-title {
      grid-column: 1 / span 2;
      margin: 0;
      margin-bottom: calc(var(--spacing-1));
    }

    .center {
      text-align: center;
      grid-column: 1 / span 2;
      margin-top: calc(var(--spacing-1));

      @include query($medium) {
        grid-column: 1 / span 1;
      }
    }

    .locale-switcher {
      grid-column: 2 / span 2;
      padding: var(--spacing-1) 0;
    }

    .intro {
      grid-column: 1 / span 2;

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

    .topic {
      color: var(--color-accent);
      font-size: var(--size-6);
    }
  }
</style>
