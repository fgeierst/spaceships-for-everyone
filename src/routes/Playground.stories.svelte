<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Playground from './Playground.svelte';

	const { Story } = defineMeta({
		title: 'Playground',
		component: Playground
	});
</script>

<Story name="Default" />
