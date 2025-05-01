<script lang="ts">
	import type { ChapterId } from '$lib/chapters';
	import type { Component } from 'svelte';

	let { id }: { id: ChapterId } = $props();
	let Markdown: Component | undefined = $state();

	$effect(() => {
		import(`$lib/chapters/${id}.svx`)
			.then((module) => {
				Markdown = module.default;
			})
			.catch((e) => {
				console.error(e);
			});
	});
</script>

<section aria-label="Docs">
	{#if Markdown}
		<Markdown />
	{/if}
</section>

<style>
</style>
