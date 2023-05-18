import { useEffect, useState } from 'react';
import { CardItem, fetchJoke } from '../../api';
import { CardList } from '../../components/CardList';

export const Home = (): JSX.Element => {
	const [jokes, setJokes] = useState<CardItem[]>([]);

	useEffect(() => {
		let ignore = false;

		if (!ignore) {
			fetchJoke(10).then((result) => {
				setJokes(result);
			});
		}

		return () => {
			ignore = true;
		};
	}, []);

	useEffect(() => {
		let timeoutId: any;

		if (!timeoutId) {
			timeoutId = setTimeout(() => {
				fetchJoke().then((result) => {
					const temp = [...jokes];
					temp.pop();
					temp.unshift(result[0]);
					setJokes(temp);
				});
			}, 5000);
		}

		return () => {
			clearTimeout(timeoutId);
			timeoutId = null;
		};
	}, [jokes]);

	return <CardList list={jokes} title='Chuck out those jokes:' />;
};
