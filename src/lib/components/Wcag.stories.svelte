<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Wcag from './Wcag.svelte';

	const { Story } = defineMeta({
		title: 'Wcag',
		component: Wcag,
		args: {
			ref_id: '1.1.1',
			variant: 'link'
		}
	});
</script>

<Story name="Link" />

<Story
	name="Card"
	args={{
		ref_id: '1.4.3',
		variant: 'card'
	}}
/>
