import { useEffect, useState } from 'react';
import { CardList } from '../../components/CardList';
import { CardItem, fetchFavorites, genericErrorResponse } from '../../api';
import { useFavoritesContext } from '../../components/FavoritesContext';
import { Link } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import { Loading } from '../../components/Loading';
import sadChuck from '../../assets/sad_chuck.png';
import styles from './Favorites.module.css';

export const Favorites = (): JSX.Element => {
	const [jokes, setJokes] = useState<CardItem[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { favorites } = useFavoritesContext();

	useEffect(() => {
		setIsLoading(true);
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
						<>
							<h3>
								No jokes found, go{' '}
								<Link className={styles.link} to={'/'}>
									here
								</Link>{' '}
								and favorite some new Chuck Norris jokes!
							</h3>
							<img src={sadChuck} alt='Sad Chuck image' aria-hidden={true} />
						</>
					)}
				</>
			)}
		</>
	);
};
