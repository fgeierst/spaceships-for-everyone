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
		<span class="rotate"><Icon name="circle-dash"></Icon></span>Running tests...
	{:then result}
		<Icon name="check"></Icon>{result}
	{:catch error}
		<Icon name="cross"></Icon>{error.message}
	{/await}
</p>

<style>
	.test-result {
		display: flex;
		align-items: center;
		gap: 0.2rem;
	}

	.rotate {
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
