export type CardItem = {
	id: string;
	value: string;
};

export const fetchJoke = async (): Promise<CardItem> => {
	const result = await fetch('https://api.chucknorris.io/jokes/random');
	return result.json();
};
