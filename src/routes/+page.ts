import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, url, data }) => {
	const chapter = url.searchParams.get('chapter') || 'hello-world';

	const [sourcecode, solutioncode] = await Promise.all([
		(await fetch(`chapters/${chapter}.html`)).text(),
		(await fetch(`chapters/${chapter}-solution.html`)).text()
	]);
	return { sourcecode, solutioncode, currentChapter: chapter, chapters: data.chapters };
};
