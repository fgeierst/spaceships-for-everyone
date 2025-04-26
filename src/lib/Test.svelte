<script lang="ts">
	import Icon from '$lib/Icon.svelte';
	import { expect } from 'chai';

	type Props = {
		testcode?: () => Promise<void>;
	};
	const {
		testcode = async () => {
			const string = `its a string`;
			expect(string).to.be.an('string');
		}
	}: Props = $props();

	async function runTests() {
		await Promise.all([new Promise((resolve) => setTimeout(resolve, 500)), testcode()]);
		return 'Test passed.';
	}
</script>

<p class="test-result">
	{#await runTests()}
		<span class="running"><Icon name="circle-dash"></Icon></span>
		Running tests...
	{:then result}
		<span class="passed"><Icon name="check"></Icon></span>
		{result}
	{:catch error}
		<span class="failed"><Icon name="cross"></Icon></span>
		{error.message}
	{/await}
</p>

<style>
	.test-result {
		display: flex;
		align-items: center;
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
