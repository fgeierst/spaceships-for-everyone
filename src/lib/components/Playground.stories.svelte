<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Playground from './Playground.svelte';

	const { Story } = defineMeta({
		title: 'Playground',
		component: Playground,
		args: {
			sourcecode: '<button>Click me</button>'
		}
	});
</script>

<Story name="Default" />
