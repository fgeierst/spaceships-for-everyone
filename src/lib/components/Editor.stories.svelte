<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Editor from './Editor.svelte';

	const { Story } = defineMeta({
		title: 'Editor',
		component: Editor,
		args: {
			sourcecode: '<h1>Hello World</h1>',
			livecode: '',
			lang: 'html'
		},
		argTypes: {
			lang: {
				control: 'radio',
				options: ['html', 'javascript']
			}
		}
	});
</script>

<Story name="Html" />

<Story
	name="JavaScript"
	args={{
		lang: 'javascript',
		sourcecode: "console.log('Hello World');"
	}}
/>
