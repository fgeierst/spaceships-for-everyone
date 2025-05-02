<script lang="ts">
	import wcag from 'wcag-as-json/src/wcag.json';

	type Props = {
		ref_id: string;
		variant?: 'link' | 'card';
	};
	const { ref_id = '1.1.1', variant = 'link' }: Props = $props();

	const [mainNumber, guidelineNumber] = ref_id.split('.');
	const mainGuideline = wcag.find((item) => item.ref_id === mainNumber);
	const guideline = mainGuideline?.guidelines?.find(
		(g) => g.ref_id === `${mainNumber}.${guidelineNumber}`
	);
	const criterion = guideline?.success_criteria?.find((sc) => sc.ref_id === ref_id);

	if (!criterion) {
		throw new Error(`No WCAG item found with ref_id: ${ref_id}`);
	}
</script>

{#if variant === 'link'}
	<a href={criterion.url} class="link"
		>WCAG
		{criterion.ref_id}
		{criterion.title}
		({criterion.level})
	</a>
{:else if variant === 'card'}
	<div class="card">
		<span class="logo">WCAG {criterion.level}</span>
		<a href={criterion.url}>{criterion.ref_id} {criterion.title}</a>
		<p>{criterion.description}</p>
		{#if criterion.special_cases}
			<ul>
				{#each criterion.special_cases as specialCase (specialCase.title)}
					<li>{specialCase.description}</li>
				{/each}
			</ul>
		{/if}
	</div>
{/if}

<style>
	.logo {
		float: right;
		border: solid #ccc;
		border-width: 0 0 1px 1px;
		margin: -0.5rem -0.5rem 0 0;
		padding: 0.3rem;
		font-size: 70%;
		font-weight: 600;
	}

	a {
		color: inherit;
	}

	.card {
		border: 1px solid #ccc;
		border-radius: 0.3rem;
		padding: 0.5rem;
		margin-block-end: 1rem;
	}
</style>
