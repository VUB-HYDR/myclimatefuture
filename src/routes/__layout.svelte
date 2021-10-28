<script>
	import { CURRENT_TEMPERATURE_INDEX } from '../stores.js';
	import Header from '$lib/header/Header.svelte';
	import '../styles/app.scss';
	import 'tippy.js/dist/tippy.css';

	// This is used to change the color sheme of the website depending on the selected warming level
	let temperature_index;
  CURRENT_TEMPERATURE_INDEX.subscribe(value => { temperature_index = `level-${value}`; });
</script>

<Header />

<main class={ `wrapper ${temperature_index}` }>
	<slot />
</main>

<footer class="page-footer wrapper">
	<p class="column">Copyright: VUB 2021. Website design and code: <a target="_blank" rel="noopener noreferrer author" href="https://jonasparnow.com" class="quiete">Jonas Parnow</a>. Find the source code of the website on <a target="_blank" rel="noopener noreferrer" href="https://github.com/VUB-HYDR/myclimatefuture" class="quiete">Github</a>.</p>
</footer>

<style lang="scss">
@import '../styles/global.scss';

main {
	display: grid;
	grid-row-gap: var(--size-vertical-outer-gap);
	justify-content: center;
	justify-items: center;

	// Depending on the class of the main tag, we switch the color variable.
	&.level-0 {
		--color-accent: var(--color-accent-0);
	}

	&.level-1 {
		--color-accent: var(--color-accent-1);
	}

	&.level-2 {
		--color-accent: var(--color-accent-2);
	}
}

.page-footer {
	display: flex;
	flex-direction: column;
	margin-top: var(--size-vertical-inner-gap);
	margin-bottom: var(--size-vertical-inner-gap);
	align-items: center;
}
</style>
