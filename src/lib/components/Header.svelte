<script lang="ts">
	import Nav from './Nav.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import type { Chapter } from '$lib/chapters';

	type Props = {
		chapters: readonly Chapter[];
		current?: string;
	};
	const { chapters, current }: Props = $props();

	let isOpen = $state(false);
</script>

<header>
	<div class="main-nav">
		<a class="logo" href="/">Spaceships for Everyone</a>

		<!-- <Pagination {chapters} {current} /> -->

		<button
			aria-expanded={isOpen ? 'true' : 'false'}
			onclick={() => {
				isOpen = !isOpen;
			}}
		>
			Chapters
			<span class="triangle"><Icon name="triangle-down" size={10} /></span>
		</button>
	</div>

	{#if isOpen}
		<Nav {chapters} {current} />
	{/if}
</header>

<style>
	header {
		border-block-end: 1px solid #ccc;
		padding: 0.3rem 0.5rem;
	}

	.main-nav {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
	}

	.logo {
		font-weight: bold;
		text-decoration: none;
		color: inherit;
	}

	button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: none;
		border: none;
		border-radius: 0.2rem;
		font-size: inherit;
	}

	.triangle {
		display: inline-block;
		button[aria-expanded='true'] & {
			transform: rotate(180deg);
		}
	}
</style>
