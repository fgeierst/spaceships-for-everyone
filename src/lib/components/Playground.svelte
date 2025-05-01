<script lang="ts">
	import { onMount } from 'svelte';
	import { EditorView, basicSetup } from 'codemirror';
	import { html } from '@codemirror/lang-html';
	import { PreviewStyles } from '$lib/preview-styles';

	const id = $props.id();
	const { sourcecode } = $props();
	let livecode = $state(sourcecode);
	let editor: EditorView | null = null;
	let previewSourceCode = $derived(`${PreviewStyles} ${livecode}`);

	onMount(() => {
		editor = new EditorView({
			doc: sourcecode,
			extensions: [
				basicSetup,
				html(),
				EditorView.lineWrapping,
				EditorView.updateListener.of((update) => {
					if (update.docChanged) livecode = update.state.doc.toString();
				})
			],

			parent: document.querySelector(`#editor-${id}`)!
		});

		return () => {
			editor?.destroy();
		};
	});

	$effect(() => {
		if (editor) {
			editor.dispatch({
				changes: {
					from: 0,
					to: editor.state.doc.length,
					insert: sourcecode
				}
			});
		}
	});
</script>

<div class="container">
	<div class="side-by-side">
		<section aria-label="Editor">
			<div class="editor" id={`editor-${id}`}></div>
		</section>
		<section aria-label="Preview">
			<iframe title="Preview" class="preview" srcdoc={previewSourceCode}></iframe>
		</section>
	</div>
</div>

<style>
	.container {
		container-type: inline-size;
	}

	.side-by-side {
		display: grid;

		@container (min-width: 600px) {
			grid-template-columns: 1fr 1fr;
		}
	}

	.preview,
	.editor {
		width: 100%;
		height: 100%;
	}

	.editor {
		border-block-end: 1px solid #ccc;

		@container (min-width: 600px) {
			border-block-end: none;
			border-inline-end: 1px solid #ccc;
		}

		:global(.cm-focused) {
			outline: none;
		}
	}

	.preview {
		border-width: 0;
	}
</style>
