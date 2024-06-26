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
  <meta
    name="robots"
    content="index,follow"
  />
  <meta
    name="description"
    content={description}
  />
  <meta
    property="og:site_name"
    content={PAGE_NAME}
  />
  <meta
    property="og:locale"
    content={$locale}
  />
  <meta
    property="og:url"
    content={$LOCALE_URL.href}
  />
  <meta
    property="og:type"
    content="website"
  />
  <meta
    property="og:title"
    content={title}
  />
  <meta
    property="og:description"
    content={description}
  />
  <meta
    property="og:image"
    content={$LOCALE_URL.preview}
  />
  <meta
    property="og:image:width"
    content="1200"
  />
  <meta
    property="og:image:height"
    content="600"
  />
  <meta
    property="og:image:alt"
    content={$t('content.PREVIEW_DESCRIPTION')}
  />
  <meta
    property="og:updated_time"
    content={new Date().toString()}
  />
  <meta
    itemprop="name"
    content={title}
  />
  <meta
    itemprop="description"
    content={description}
  />
  <meta
    name="twitter:card"
    content="summary_large_image"
  />
  <meta
    name="twitter:image"
    content={$LOCALE_URL.preview}
  />
  <meta
    name="twitter:title"
    content={title}
  />
  <meta
    name="twitter:description"
    content={description}
  />
  <link
    rel="icon"
    href="/favicon.ico"
    sizes="48x48"
  />
  <link
    rel="icon"
    href="/favicon.svg"
    type="image/svg+xml"
    media="(prefers-color-scheme: light)"
  />
  <link
    rel="icon"
    href="/favicon-dark.svg"
    type="image/svg+xml"
    media="(prefers-color-scheme: dark)"
  />
  <link
    rel="canonical"
    href={$LOCALE_URL.href}
  />
  {#each $locales as lang}
    <link
      rel="alternate"
      hreflang={lang === 'en' ? 'x-default' : lang}
      href={getLocaleURL(lang).href}
    />
  {/each}
</svelte:head>

<Head />
<div class="grid lg:grid-cols-2 content-start justify-center items-center w-full gap-8 md:gap-14">
  <Questions />
  <section class="grid gap-y-8 lg:grid-cols-3 lg:gap-y-14 column">
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
