<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Editor from './Editor.svelte';

	const { Story } = defineMeta({
		title: 'Editor',
		component: Editor,
		args: {
			sourcecode: '<h1>Hello World</h1>',
			livecode: ''
		}
	});
</script>

<Story name="Default" />
