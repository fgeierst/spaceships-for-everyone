<script>
	import { onMount } from 'svelte';

	const projectSrc = $state('/chapters/button.json');
	onMount(() => {});
</script>

<svelte:head>
	<script type="module" src="node_modules/playground-elements/playground-ide.js"></script>
</svelte:head>

<link rel="stylesheet" href="/node_modules/playground-elements/themes/neo.css" />

<playground-ide
	id="playground"
	resizable
	editable-file-system
	line-numbers
	line-wrapping
	class="playground-theme-neo"
	project-src={projectSrc}
>
</playground-ide>

<style>
	#playground {
		--playground-code-font-family: Roboto Mono, monospace;
	}
</style>
