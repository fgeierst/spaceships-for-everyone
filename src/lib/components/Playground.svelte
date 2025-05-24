<script lang="ts">
	import Editor from './Editor.svelte';
	import { PreviewStyles } from '$lib/preview-styles';

	let { sourcecode, livecode = $bindable('') } = $props();
	// let livecode = $state(sourcecode);

	let previewSourceCode = $derived(`${PreviewStyles} ${livecode}`);
</script>

<div class="container">
	<div class="side-by-side">
		<Editor {sourcecode} bind:livecode />
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

	.preview {
		width: 100%;
		height: 100%;
	}

	.preview {
		border-width: 0;
	}
</style>
