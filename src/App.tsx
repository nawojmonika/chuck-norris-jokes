import React, { useEffect, useState } from 'react';
import './App.css';
import { CardList } from './components/CardList';
import { CardItem, fetchJoke } from './api';
import { FavoritesWrapper } from './components/CardList/components/FavoritesContext';

function App(): JSX.Element {
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

	return (
		<FavoritesWrapper>
			<CardList list={jokes} />
		</FavoritesWrapper>
	);
}

export default App;
