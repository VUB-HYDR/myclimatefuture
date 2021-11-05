<script context="module">
	import { PAGE_NAME, PAGE_TITLE, LANGUAGE, URL, PAGE_DESCRIPTION } from '../config.js';
	export const prerender = true;
</script>

<script>
	import Questions from '$lib/Questions.svelte';
	import FAQ from '$lib/FAQ.svelte';
	import About from '$lib/About.svelte';
	import Footer from '$lib/Footer.svelte';
	import Vis from '$lib/Vis/Vis.svelte';
	import Text from '$lib/Text/Text.svelte';
	import Head from '$lib/Head.svelte';
	import AspectRatio from '$lib/AspectRatio/AspectRatio.svelte';
	import DownloadButton from '$lib/DownloadButton/DownloadButton.svelte';
	import SocialButtons from '$lib/SocialButtons/SocialButtons.svelte';
</script>

<svelte:head>
	<title>{ PAGE_NAME }</title>
	<meta name="robots" content="index,follow">
	<meta name="description" content={ PAGE_DESCRIPTION }>
	<meta property="og:site_name" content={ PAGE_NAME } />
  <meta property="og:locale" content={ LANGUAGE } />
  <meta property="og:url" content={ URL } />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={ PAGE_TITLE } />
  <meta property="og:description" content={ PAGE_DESCRIPTION } />
  <meta property="og:image" content={`${URL}/preview.png`} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="600" />
  <meta property="og:image:alt" content={ PAGE_DESCRIPTION } />
	<meta property="og:updated_time" content={ new Date().toString() } />
	<meta itemprop=name content={ PAGE_TITLE } />
	<meta itemprop=description content={ PAGE_DESCRIPTION } />
	<meta name=twitter:card content="summary_large_image" />
	<meta name=twitter:image content={`${URL}/preview.png`} />
	<meta name=twitter:title content={ PAGE_TITLE } />
	<meta name=twitter:description content={ PAGE_DESCRIPTION } />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
	<link rel="manifest" href="/site.webmanifest" />
  <link rel="canonical" href="{ URL }" />
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
@import '../styles/global.scss';

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
