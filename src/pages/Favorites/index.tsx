import { useEffect, useState } from 'react';
import { CardList } from '../../components/CardList';
import { CardItem, fetchFavorites } from '../../api';
import { useFavoritesContext } from '../../components/FavoritesContext';

export const Favorites = (): JSX.Element => {
	const [jokes, setJokes] = useState<CardItem[]>([]);
	const { favorites } = useFavoritesContext();

	useEffect(() => {
		let ignore = false;

		if (!ignore) {
			fetchFavorites(favorites).then((result) => {
				setJokes(result);
			});
		}

		return () => {
			ignore = true;
		};
	}, [favorites]);

	return <CardList list={jokes} title='Chuck out my favorite jokes:' />;
};
