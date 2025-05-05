<script lang="ts">
	import type { ChapterId } from '$lib/chapters';
	import type { Component } from 'svelte';

	let { id, livecode }: { id: ChapterId; livecode: string } = $props();
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
		<Markdown {livecode} />
	{/if}
</section>

<style>
</style>
