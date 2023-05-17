import clsx from 'clsx';
import { CardItem } from '../../../../api';
import { StarBorderOutlined, StarOutlined } from '@mui/icons-material';
import { useFavoritesContext } from '../FavoritesContext';
import styles from './Card.module.css';
import { useMemo } from 'react';

type Props = CardItem;

export const Card = ({ id, value }: Props): JSX.Element => {
	const { favorites, addFavorite, removeFavorite } = useFavoritesContext();
	const isFavorite = useMemo(() => favorites.includes(id), [favorites, id]);

	const handleFavorite = () => {
		isFavorite ? removeFavorite(id) : addFavorite(id);
	};

	return (
		<div className={styles.card}>
			<span
				className={clsx(styles.starIcon, isFavorite && styles.favorite)}
				onClick={handleFavorite}>
				<StarBorderOutlined />
				<StarOutlined />
			</span>
			{value}
		</div>
	);
};
