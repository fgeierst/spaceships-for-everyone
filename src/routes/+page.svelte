<script lang="ts">
	import Playground from './Playground.svelte';
	import type { PageProps } from './$types';
	import { compile } from 'mdsvex';

	let { data }: PageProps = $props();

	let isSolved = $state(false);
</script>

<svelte:head>
	<title>Spaceships for Everyone</title>
</svelte:head>

<h1>Spaceships for Everyone</h1>

<ul>
	{#each data.chapters as chapter (chapter)}
		<li>
			<a
				href={`/?chapter=${chapter}`}
				aria-current={chapter === data.currentChapter ? 'page' : null}>{chapter}</a
			>
		</li>
	{/each}
</ul>

<main>
	<section class="readme" aria-label="Readme">
		{#await compile(data.readme) then compiled}
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html compiled?.code}
		{/await}
		<button onclick={() => (isSolved = !isSolved)}>{isSolved ? 'Reset' : 'Solve'}</button>
	</section>

	<div>
		<Playground sourcecode={isSolved ? data.solutioncode : data.sourcecode} />
	</div>
</main>

<style>
	ul {
		list-style: none;
		padding: 0;
		display: flex;
		gap: 1rem;
	}
	a {
		text-decoration: none;
		color: inherit;
		&::before {
			content: '▶︎ ';
			opacity: 0;
		}
	}
	[aria-current='page'] {
		&::before {
			opacity: 1;
		}
	}

	main {
		display: grid;
		grid-template-columns: 1fr 2fr;
		border-block-start: 1px solid #ccc;
	}

	.readme {
		border-right: 1px solid #ccc;
	}
</style>
