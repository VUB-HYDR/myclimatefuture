<script>
	import { HASHTAG, PAGE_TITLE } from '../config.js';
</script>

<header class="page-header grid-half column">
	<span class="topic">#{ HASHTAG }</span>
	<h1 class="page-title">{ PAGE_TITLE }</h1>
	<p class="intro">Here you can find out how many more climate extremes you will face across your lifetime relative to a world without climate change. The results are based on <a href="https://www.science.org/doi/10.1126/science.abi7339"  target="_blank" rel="noopener noreferrer">solid science</a>.</p>
	<div class="center"><span role="alert" class="info">We don’t store your data.</span></div>
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
