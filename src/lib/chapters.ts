export type ChapterId = (typeof chapters)[number]['id'];

export type Chapter = {
	title: string;
	id: ChapterId;
};

export const chapters = [
	{ title: '0.1 Hello World', id: '01-hello-world' },
	{ title: '0.2 Button', id: '02-button' },
	{ title: '0.3 Web Component', id: '03-web-component' },
	{ title: '1.0 Keyboard', id: '10-keyboard' },
	{ title: '1.1 Focus Visible', id: '11-focus-visible' },
	{ title: '1.2 Focus Order', id: '12-focus-order' }
] as const;
