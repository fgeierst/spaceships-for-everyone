<script lang="ts">
	import type { Chapter } from '$lib/chapters';

	type Props = {
		chapters: Chapter[];
		current?: string;
	};
	const { chapters, current }: Props = $props();
</script>

<nav>
	<ul>
		{#each chapters as { title, id } (id)}
			<li>
				<a href={`/${id}`} aria-current={current === id ? 'page' : undefined}>
					{title}
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	ul {
		list-style: none;
		padding: 0;
	}

	li {
		margin-inline-start: 0;
		font-variant-numeric: tabular-nums;
	}

	a {
		text-decoration: none;
		color: inherit;

		&:hover {
			text-decoration: underline;
		}

		&[aria-current='page'] {
			display: inline-flex;
			align-items: center;
			gap: 0.3rem;

			&:after {
				content: '';
				display: inline-block;
				width: 0.5rem;
				height: 0.5rem;
				background-color: currentColor;
				border-radius: 50%;
			}
		}
	}
</style>
