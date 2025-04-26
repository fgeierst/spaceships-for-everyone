<script lang="ts">
	import Playground from './Playground.svelte';
	import type { PageProps } from './$types';
	import Icon from '$lib/Icon.svelte';

	let { data }: PageProps = $props();
	let MyComponent = $state();
	// let MyComponent = $derived.by(async () => {
	// 	return (await import(`../lib/chapters/${data.currentChapter}.svx`)).default;
	// });

	$effect(() => {
		import(`../lib/chapters/${data.currentChapter}.svx`).then((module) => {
			MyComponent = module.default;
		});
	});

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
		<button class="solve-button" onclick={() => (isSolved = !isSolved)} aria-pressed={isSolved}>
			<Icon name={isSolved ? 'reset' : 'solve'}></Icon>
			{isSolved ? 'Reset' : 'Solve'}
		</button>

		{#if MyComponent}
			<MyComponent livecode={isSolved ? data.solutioncode : data.sourcecode}></MyComponent>
		{/if}
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

	.solve-button {
		display: flex;
		align-items: center;
		gap: 0.4rem;
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
