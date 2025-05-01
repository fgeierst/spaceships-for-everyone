<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Icon from './Icon.svelte';
	import type { Props } from './Icon.svelte';

	const { Story } = defineMeta({
		title: 'Icon',
		component: Icon,
		args: {
			name: 'check',
			size: 16,
			alt: 'Chapter solved'
		}
	});

	const availableIcons: Array<Props['name']> = [
		'check',
		'cross',
		'circle-dash',
		'reset',
		'solve',
		'triangle-down'
	];
</script>

<Story name="Available Icons">
	<div
		style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 16px;"
	>
		{#each availableIcons as iconName (iconName)}
			<div style="text-align: center;">
				<Icon name={iconName} size={32} alt={iconName} />
				<p>{iconName}</p>
			</div>
		{/each}
	</div>
</Story>

<Story name="Default" />
