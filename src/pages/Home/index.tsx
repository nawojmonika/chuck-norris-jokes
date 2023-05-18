import { useEffect, useState } from 'react';
import { CardItem, fetchJoke, genericErrorResponse } from '../../api';
import { CardList } from '../../components/CardList';
import { useSnackbar } from 'notistack';

export const Home = (): JSX.Element => {
	const [jokes, setJokes] = useState<CardItem[]>([]);
	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		let ignore = false;

		if (!ignore) {
			fetchJoke(10).then(
				(result) => {
					setJokes(result);
				},
				(error) => {
					console.error(error);
					enqueueSnackbar(genericErrorResponse, {
						variant: 'error',
					});
				}
			);
		}

		return () => {
			ignore = true;
		};
	}, []);

	useEffect(() => {
		let timeoutId: any;

		if (!timeoutId) {
			timeoutId = setTimeout(() => {
				fetchJoke().then(
					(result) => {
						const temp = [...jokes];
						temp.pop();
						temp.unshift(result[0]);
						setJokes(temp);
					},
					(error) => {
						console.error(error);
						enqueueSnackbar(genericErrorResponse, {
							variant: 'error',
						});
					}
				);
			}, 5000);
		}

		return () => {
			clearTimeout(timeoutId);
			timeoutId = null;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [jokes]);

	return <CardList list={jokes} title='Chuck out those jokes:' />;
};
