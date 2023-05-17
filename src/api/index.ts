export type CardItem = {
	id: string;
	value: string;
};

export const fetchJoke = async (limit = 1): Promise<CardItem[]> => {
	const results = [];
	for (let i = 0; i < limit; i++) {
		const item = await fetch('https://api.chucknorris.io/jokes/random');
		results.push(item.json());
	}
	return Promise.all(results);
};
