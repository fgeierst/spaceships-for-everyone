import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { chapters } from '$lib/chapters';

export const load = (async ({ params, fetch }) => {
	const id = params.id;
	const current = chapters.find((c) => c.id === id);

	if (!current) {
		throw error(404, {
			message: `Chapter ${id} not found`
		});
	}

	const [sourcecode, solutioncode] = await Promise.all([
		fetch(`/chapters/${current.id}.html`)
			.then((r) => r.text())
			.catch((e) => {
				console.error(`Failed to load example for chapter ${current.id}:`, e);
				return '';
			}),
		fetch(`/chapters/${current.id}-solution.html`)
			.then((r) => r.text())
			.catch((e) => {
				console.error(`Failed to load solution for chapter ${current.id}:`, e);
				return '';
			})
	]);

	return { current, sourcecode, solutioncode };
}) satisfies PageLoad;
