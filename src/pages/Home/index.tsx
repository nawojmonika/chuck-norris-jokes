import { useEffect, useState } from 'react';
import { CardItem, fetchJoke } from '../../api';
import { CardList } from '../../components/CardList';
import { useFavoritesContext } from '../../components/FavoritesContext';
import { Alert, Snackbar } from '@mui/material';

export const Home = (): JSX.Element => {
	const [jokes, setJokes] = useState<CardItem[]>([]);
	const { errorVisible, handleErrorClose } = useFavoritesContext();

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
		<>
			<CardList list={jokes} title='Chuck out those jokes:' />
			<Snackbar
				open={errorVisible}
				autoHideDuration={6000}
				onClose={handleErrorClose}>
				<Alert
					onClose={handleErrorClose}
					severity='error'
					sx={{ width: '100%' }}>
					You can only mark 10 jokes as favorite!
					<br />
					If you really really like this one...
					<br />
					You have to unfavorite another joke!
				</Alert>
			</Snackbar>
		</>
	);
};
