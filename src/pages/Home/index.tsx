/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { CardItem, fetchJoke, genericErrorResponse } from '../../api';
import { CardList } from '../../components/CardList';
import { useSnackbar } from 'notistack';
import { Loading } from '../../components/Loading';
import { Empty } from '../../components/Empty';

export const Home = (): JSX.Element => {
	const [jokes, setJokes] = useState<CardItem[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		let ignore = false;

		if (!ignore) {
			fetchJoke(10).then(
				(result) => {
					setJokes(result);
					setIsLoading(false);
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
	}, [jokes]);

	return (
		<>
			{isLoading ? (
				<Loading />
			) : jokes.length ? (
				<CardList list={jokes} title='Chuck out those jokes:' />
			) : (
				<Empty />
			)}
		</>
	);
};
