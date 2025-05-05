<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Test from '$lib/components/Test.svelte';
	import { getByRole } from '@testing-library/dom';
	import { expect } from 'chai';

	const { Story } = defineMeta({
		title: 'Test',
		component: Test,
		args: {
			testFunction: `const heading = getByRole(screen, 'heading', { level: 1 });
expect(heading).to.exist;`,
			livecode: '<h1>Hello World</h1>'
		}
	});
</script>

<Story name="Passing" />

<Story
	name="Failing"
	args={{
		livecode: '<button>Hello World</button>',
		testFunction: `const button = getByRole(screen, 'button', { name: 'Hallo Welt'});
expect(button).to.exist;`
	}}
/>
