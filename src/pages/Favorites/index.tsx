import { useEffect, useState } from 'react';
import { CardList } from '../../components/CardList';
import { CardItem, fetchFavorites, genericErrorResponse } from '../../api';
import { useFavoritesContext } from '../../components/FavoritesContext';
import { Link } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import { Loading } from '../../components/Loading';
import { Empty } from '../../components/Empty';
import styles from './Favorites.module.css';

export const Favorites = (): JSX.Element => {
	const [jokes, setJokes] = useState<CardItem[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { favorites } = useFavoritesContext();

	useEffect(() => {
		if (favorites.length) {
			fetchFavorites(favorites).then(
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
		} else {
			setIsLoading(false);
		}
	}, [favorites]);

	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<>
					{favorites.length ? (
						<CardList list={jokes} title='Chuck out my favorite jokes:' />
					) : (
						<Empty>
							No jokes found, go{' '}
							<Link className={styles.link} to={'/'}>
								here
							</Link>{' '}
							and favorite some new Chuck Norris jokes!
						</Empty>
					)}
				</>
			)}
		</>
	);
};
