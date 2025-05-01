import type { PageServerLoad } from './$types';
import fs from 'fs';

export const prerender = true;

export const load = (async () => {
	const files = fs.readdirSync('static/chapters');
	const chapters: string[] = [];
	files.forEach((f) => {
		if (f.includes('solution') || f.includes('.mdx')) return null;
		chapters.push(f.replace('.html', ''));
	});
	return { chapters };
}) satisfies PageServerLoad;
