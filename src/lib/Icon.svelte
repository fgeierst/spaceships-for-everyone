<script lang="ts">
	type Props = {
		name?: 'check' | 'cross' | 'circle-dash' | 'reset' | 'solve';
		size?: number;
		alt?: string;
	};
	let { name = 'check', size = 24, alt = '' }: Props = $props();
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 32 32"
	xmlns="http://www.w3.org/2000/svg7"
	aria-hidden={alt ? 'false' : 'true'}
	role={alt ? 'img' : undefined}
>
	{#if alt}
		<title>{alt}</title>
	{/if}
	{#if name === 'check'}
		<path d="m14 21.414l-5-5.001L10.413 15L14 18.586L21.585 11L23 12.415z" />
		<path d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m0 26a12 12 0 1 1 12-12a12 12 0 0 1-12 12" />
	{:else if name === 'cross'}
		<path
			d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12s-5.4 12-12 12"
		/>
		<path
			d="M21.4 23L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"
		/>
	{:else if name === 'circle-dash'}
		<path
			d="M7.7 4.7a14.7 14.7 0 0 0-3 3.1L6.3 9a13.3 13.3 0 0 1 2.6-2.7zm-3.1 7.6l-1.9-.6A12.5 12.5 0 0 0 2 16h2a11.5 11.5 0 0 1 .6-3.7m-1.9 8.1a14.4 14.4 0 0 0 2 3.9l1.6-1.2a12.9 12.9 0 0 1-1.7-3.3zm5.1 6.9a14.4 14.4 0 0 0 3.9 2l.6-1.9A12.9 12.9 0 0 1 9 25.7zm3.9-24.6l.6 1.9A11.5 11.5 0 0 1 16 4V2a12.5 12.5 0 0 0-4.3.7m12.5 24.6a15.2 15.2 0 0 0 3.1-3.1L25.7 23a11.5 11.5 0 0 1-2.7 2.7zm3.2-7.6l1.9.6A15.5 15.5 0 0 0 30 16h-2a11.5 11.5 0 0 1-.6 3.7m1.8-8.1a14.4 14.4 0 0 0-2-3.9l-1.6 1.2a12.9 12.9 0 0 1 1.7 3.3zm-5.1-7a14.4 14.4 0 0 0-3.9-2l-.6 1.9a12.9 12.9 0 0 1 3.3 1.7zm-3.8 24.7l-.6-1.9a11.5 11.5 0 0 1-3.7.6v2a21.4 21.4 0 0 0 4.3-.7"
		/>
	{:else if name === 'reset'}
		<path
			d="M18 28A12 12 0 1 0 6 16v6.2l-3.6-3.6L1 20l6 6l6-6l-1.4-1.4L8 22.2V16a10 10 0 1 1 10 10Z"
		/>
	{:else if name === 'solve'}
		<path
			d="M29.414 24L12 6.586a2.05 2.05 0 0 0-2.828 0L6.586 9.172a2 2 0 0 0 0 2.828l17.413 17.414a2 2 0 0 0 2.828 0l2.587-2.586a2 2 0 0 0 0-2.828M8 10.586L10.586 8l5 5l-2.587 2.587zM25.413 28l-11-10.999L17 14.414l11 11ZM2 16l2-2l2 2l-2 2zM14 4l2-2l2 2l-2 2zM2 4l2-2l2 2l-2 2z"
		/>
	{:else}{/if}
</svg>

<style>
	svg {
		fill: currentColor;
		display: inline-block;
	}
</style>
