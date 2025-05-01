<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Docs from './Docs.svelte';

	const { Story } = defineMeta({
		title: 'Docs',
		component: Docs,
		args: {
			id: '02-button'
		}
	});
</script>

<Story name="Default" />
