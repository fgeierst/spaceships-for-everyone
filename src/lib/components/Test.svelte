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
	const id = $props.id();

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

<section class="flow" aria-labelledby={`heading-${id}`}>
	<div class="header">
		<span id={`heading-${id}`} class="heading">Test Runner</span>
		<button onclick={runTests}><Icon name="play" alt="Run test" size={20} /></button>
	</div>

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
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		margin-block-end: 1rem;
		border-radius: var(--border-radius);
		border: 1px solid var(--border-color);
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		padding: 0.1rem 0 0.1rem 0.3rem;
		background-color: var(--surface-color-3);
		border-block-end: 1px solid var(--border-color);
		border-radius: var(--border-radius) var(--border-radius) 0 0;
	}

	.heading {
		font-size: 85%;
		font-weight: 500;
		color: var(--text-color-1);
	}

	button {
		background: none;
		border: none;
		display: grid;

		&:hover {
			cursor: pointer;
		}
	}

	iframe {
		display: none;
	}

	.test-result {
		display: flex;
		align-items: start;
		gap: 0.2rem;
		margin-block: 0 var(--border-radius);
		padding: 0.1rem;
		font-family: monospace;
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
