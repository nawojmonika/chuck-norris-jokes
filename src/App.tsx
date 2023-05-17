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

	useEffect(() => {
		let timeoutId: any;

		if (!timeoutId) {
			timeoutId = setTimeout(() => {
				fetchJoke().then((result) => {
					console.log('refresh!');
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

	return <CardList list={jokes} />;
}

export default App;
