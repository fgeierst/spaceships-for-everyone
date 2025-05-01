<script lang="ts">
	import type { Chapter } from '$lib/chapters';

	type Props = {
		chapters: Chapter[];
		current?: string;
	};
	const { chapters, current }: Props = $props();

	const currentIndex = chapters.findIndex((chapter) => chapter.id === current);
	const prevUrl = currentIndex > 0 ? `/chapters/${chapters[currentIndex - 1].id}` : undefined;
	const nextUrl =
		currentIndex < chapters.length - 1 ? `/chapters/${chapters[currentIndex + 1].id}` : undefined;
</script>

<nav aria-label="Pagination">
	{#if prevUrl}
		<a href={prevUrl}>Previous</a>
	{/if}
	{currentIndex}
	{#if nextUrl}
		<a href={nextUrl}>Next</a>
	{/if}
</nav>

<style>
	nav {
		display: flex;
		gap: 1rem;
	}

	a {
		text-decoration: none;
		color: inherit;
	}
</style>
