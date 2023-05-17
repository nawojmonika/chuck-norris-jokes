import React, { useEffect, useState } from 'react';
import './App.css';
import { CardList } from './components/CardList';
import { CardItem, fetchJoke } from './api';

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

	return <CardList list={jokes} />;
}

export default App;
