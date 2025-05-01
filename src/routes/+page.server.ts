import type { PageServerLoad } from './$types';
// import fs from 'fs';

export const load = (async () => {
	// can't access file system in vercel https://svelte.dev/docs/kit/adapter-vercel#Troubleshooting-Accessing-the-file-system
	// const files = fs.readdirSync('static/chapters');
	// const chapters: string[] = [];
	// files.forEach((f) => {
	// 	if (f.includes('solution') || f.includes('.mdx')) return null;
	// 	chapters.push(f.replace('.html', ''));
	// });
	const chapters = ['button', 'hello-world', 'web-component'];
	return { chapters };
}) satisfies PageServerLoad;
