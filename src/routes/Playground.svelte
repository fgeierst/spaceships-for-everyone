<script lang="ts">
	import { onMount } from 'svelte';
	import { EditorView, basicSetup } from 'codemirror';
	import { javascript } from '@codemirror/lang-javascript';

	const id = $props.id();
	const projectSrc = $state('/chapters/button.json');
	let editor: EditorView | null = null;

	onMount(() => {
		editor = new EditorView({
			doc: 'Hello world',
			extensions: [
				basicSetup,
				javascript({
					jsx: true,
					typescript: true
				}),
				EditorView.lineWrapping,
				EditorView.updateListener.of((update) => {
					if (update.docChanged) {
						console.log('Document changed:', update.state.doc.toString());
					}
				})
			],
			parent: document.querySelector(`#editor-${id}`)!
		});

		return () => {
			editor?.destroy();
		};
	});
</script>

<div id={`editor-${id}`}></div>

<style>
</style>
