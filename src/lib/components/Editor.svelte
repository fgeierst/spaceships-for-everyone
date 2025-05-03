<script lang="ts">
	import { onMount } from 'svelte';
	import { EditorView, basicSetup } from 'codemirror';
	import { html } from '@codemirror/lang-html';
	import { javascript } from '@codemirror/lang-javascript';

	type Props = {
		sourcecode: string;
		livecode?: string;
		lang?: 'html' | 'javascript';
	};
	let { sourcecode, livecode = $bindable(), lang = 'html' } = $props();
	const id = $props.id();
	let editor: EditorView | null = null;

	onMount(() => {
		editor = new EditorView({
			doc: sourcecode,
			extensions: [
				basicSetup,
				lang === 'html' ? html() : javascript(),
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

<section aria-label="Editor">
	<div class="editor" id={`editor-${id}`}></div>
</section>

<style>
	.editor {
		width: 100%;
		height: 100%;
		border-block-end: 1px solid #ccc;

		:global(.cm-focused) {
			outline: none;
		}
	}
</style>
