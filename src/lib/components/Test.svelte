<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import Editor from './Editor.svelte';
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	import { getByRole } from '@testing-library/dom';
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	import { expect } from 'chai';

	type Props = {
		testFunction: string;
		livecode: string;
	};
	let { livecode, testFunction }: Props = $props();

	type State = 'running' | 'passed' | 'failed';
	let currentState: State = $state('running');
	let msg = $state();
	let iframe: HTMLIFrameElement | null = null;
	let testFunctionSource = $state('');

	$effect(() => {
		iframe?.addEventListener('load', () => {
			runTests();
		});
		if (livecode) currentState = 'running';
	});

	async function runTests() {
		currentState = 'running';
		await new Promise((r) => setTimeout(r, 500)); // to indicate test are running
		try {
			await eval(`(
				async () => {
					const screen = document.querySelector('#testcontainer').contentDocument;
					${testFunctionSource}
				}
			)()`);
			currentState = 'passed';
		} catch (error) {
			currentState = 'failed';
			msg = error instanceof Error ? error.message : 'Unknown error';
			console.error('Test failed:', error);
		}
	}
</script>

<div class="flow">
	<Editor
		lang="javascript"
		sourcecode={testFunction?.toString()}
		bind:livecode={testFunctionSource}
	/>

	<iframe
		bind:this={iframe}
		src=""
		srcdoc={livecode}
		frameborder="0"
		title="Test Container"
		id="testcontainer"
	></iframe>

	<button onclick={runTests}>Run Test</button>

	<p class="test-result">
		{#if currentState === 'running'}
			<span class="running"><Icon name="circle-dash"></Icon></span>
			Running tests...
		{:else if currentState === 'passed'}
			<span class="passed"><Icon name="check"></Icon></span> Test passed.
		{:else if currentState === 'failed'}
			<span class="failed"><Icon name="cross"></Icon></span> Test failed: {msg}
		{/if}
	</p>
</div>

<style>
	.flow {
		display: flex;
		flex-direction: column;
		align-items: start;
		gap: 1rem;
		margin-block-end: 1rem;
	}

	iframe {
		display: none;
	}

	.test-result {
		display: flex;
		align-items: start;
		gap: 0.2rem;
		margin-block: 0;
	}

	.passed {
		color: #66ba1c;
		display: grid;
	}
	.failed {
		color: #f87171;
		display: grid;
	}

	.running {
		color: #facc14;
		display: grid;
		animation: rotate 1.5s linear infinite;
		@media (prefers-reduced-motion: reduce) {
			animation: none;
		}
	}
	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
