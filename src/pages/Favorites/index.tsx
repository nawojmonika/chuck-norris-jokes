import { useEffect, useState } from 'react';
import { CardList } from '../../components/CardList';
import { CardItem, fetchFavorites } from '../../api';
import { useFavoritesContext } from '../../components/FavoritesContext';
import { Link } from 'react-router-dom';
import sadChuck from '../../assets/sad_chuck.png';

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

	return (
		<>
			{jokes.length ? (
				<CardList list={jokes} title='Chuck out my favorite jokes:' />
			) : (
				<>
					<h3>
						No jokes found, go <Link to={'/'}>here</Link> and find some new
						Chuck Norris jokes!
					</h3>
					<img src={sadChuck} alt='Sad Chuck image' aria-hidden={true} />
				</>
			)}
		</>
	);
};
