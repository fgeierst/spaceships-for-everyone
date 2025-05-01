<script lang="ts">
	import type { PageData } from './$types';
	import Header from '$lib/components/Header.svelte';
	import Docs from '$lib/components/Docs.svelte';
	import SolveButton from '../../lib/components/SolveButton.svelte';
	import Playground from '$lib/components/Playground.svelte';
	import { chapters } from '$lib/chapters';

	let { data }: { data: PageData } = $props();
	let isSolved = $state(false);
</script>

<svelte:head><title>{data.current.title} - Spaceships for Everyone</title></svelte:head>

<Header {chapters} current={data.current.id} />

<main>
	<div class="docs">
		<Docs id={data.current.id}></Docs>
		<SolveButton bind:isSolved />
	</div>

	<Playground sourcecode={isSolved ? data.solutioncode : data.sourcecode} />
</main>

<style>
	main {
		display: grid;

		@media (min-width: 800px) {
			grid-template-columns: 1fr 2fr;
		}
	}

	.docs {
		padding: 0.5rem;
		border-block-end: 1px solid #ccc;

		@media (min-width: 800px) {
			border-block-end: none;
			border-inline-end: 1px solid #ccc;
		}
	}
</style>
