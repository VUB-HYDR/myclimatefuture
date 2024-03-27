<script>
  import { PAGE_NAME } from '$config';
  import { LOCALE_URL } from '$store';
  import { t, locale, locales } from '$lib/translations';
  import { getLocaleURL } from '$utils';
  import About from '$lib/About.svelte';
  import AspectRatio from '$lib/AspectRatio/AspectRatio.svelte';
  import DownloadButton from '$lib/DownloadButton/DownloadButton.svelte';
  import FAQ from '$lib/FAQ.svelte';
  import Footer from '$lib/Footer.svelte';
  import Head from '$lib/Head.svelte';
  import Questions from '$lib/Questions.svelte';
  import SocialButtons from '$lib/SocialButtons/SocialButtons.svelte';
  import Text from '$lib/Text/Text.svelte';
  import Vis from '$lib/Vis/Vis.svelte';

  $: title = `${PAGE_NAME} - ${$t('content.PAGE_TITLE')}`;
  $: description = $t('content.PAGE_DESCRIPTION');
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="robots" content="index,follow" />
  <meta name="description" content={description} />
  <meta property="og:site_name" content={PAGE_NAME} />
  <meta property="og:locale" content={$locale} />
  <meta property="og:url" content={$LOCALE_URL.href} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={`${$LOCALE_URL.href}/preview.png`} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="600" />
  <meta property="og:image:alt" content={$t('content.PREVIEW_DESCRIPTION')} />
  <meta property="og:updated_time" content={new Date().toString()} />
  <meta itemprop="name" content={title} />
  <meta itemprop="description" content={description} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content={`${$LOCALE_URL.href}/preview.png`} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />
  <link rel="canonical" href={$LOCALE_URL.href} />

  {#each $locales as lang}
    <link rel="alternate" hreflang={lang === 'en' ? 'x-default' : lang} href={getLocaleURL(lang).href} />
  {/each}
</svelte:head>

<Head />
<div class="generator">
  <Questions />
  <section class="output column">
    <Text />
    <SocialButtons />
    <Vis />
    <AspectRatio />
    <DownloadButton />
  </section>
</div>

<FAQ />
<About />
<Footer />

<style lang="scss">
  @import '$styles/global.scss';

  .generator {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    align-content: start;
    grid-row-gap: var(--size-vertical-outer-gap);
    justify-content: center;
    justify-items: center;
    width: 100%;

    @include query($medium) {
      grid-column-gap: var(--size-vertical-inner-gap);
      grid-template-columns: repeat(2, 1fr);
    }

    @include query($wide) {
      grid-column-gap: var(--size-vertical-outer-gap);
    }
  }

  .output {
    display: grid;
    grid-row-gap: var(--size-vertical-inner-gap);

    @include query($medium) {
      @include sticky-grid();
      grid-template-columns: repeat(3, 1fr);
      grid-column-gap: var(--size-vertical-outer-gap);
    }
  }
</style>
