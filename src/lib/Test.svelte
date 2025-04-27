<script lang="ts">
	import Icon from '$lib/Icon.svelte';

	type Props = {
		testcode?: () => Promise<void>;
		livecode?: string;
	};
	let { testcode, livecode }: Props = $props();

	type State = 'running' | 'passed' | 'failed';
	let currentState: State = $state('running');
	let msg = $state();

	$effect(() => {
		if (livecode) currentState = 'running';
		setTimeout(() => {
			runTests();
		}, 1000);
	});

	async function runTests() {
		try {
			testcode?.();
			currentState = 'passed';
		} catch (error) {
			currentState = 'failed';
			msg = error instanceof Error ? error.message : 'Unknown error';
		}
	}
</script>

Testcode: {JSON.stringify(testcode)}

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

<style>
	.test-result {
		display: flex;
		align-items: start;
		gap: 0.2rem;
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
