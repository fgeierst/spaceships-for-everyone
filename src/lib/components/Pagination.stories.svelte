<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Pagination from './Pagination.svelte';

	const { Story } = defineMeta({
		title: 'Pagination',
		component: Pagination,
		args: {
			chapters: [
				{ title: '1.0 Keyboard', id: '10-keyboard' },
				{ title: '1.1 Focus Visible', id: '11-focus-visible' },
				{ title: '1.2 Focus Order', id: '12-focus-order' }
			],
			current: '11-focus-visible'
		}
	});
</script>

<Story name="Default" />
