<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';

	let { isSolved = $bindable(false) }: { isSolved: boolean } = $props();
</script>

<button onclick={() => (isSolved = !isSolved)} aria-pressed={isSolved}>
	<Icon name={isSolved ? 'reset' : 'solve'} />
	{isSolved ? 'Reset' : 'Solve'}
</button>

<style>
	button {
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}
</style>
