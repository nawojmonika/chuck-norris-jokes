import React, { useEffect, useState } from 'react';
import './App.css';
import { CardList } from './components/CardList';
import { fetchJoke } from './api';

function App(): JSX.Element {
	const [jokes, setJokes] = useState([]);

	useEffect(() => {
		let ignore = false;
		if (!ignore) {
			fetchJoke().then((result) => {
				console.log(result);
			});
		}

		return () => {
			ignore = true;
		};
	}, []);

	return <CardList list={jokes} />;
}

export default App;
