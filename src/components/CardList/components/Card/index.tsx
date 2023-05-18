import clsx from 'clsx';
import { CardItem } from '../../../../api';
import { StarBorderOutlined, StarOutlined } from '@mui/icons-material';
import styles from './Card.module.css';

export type CardProps = CardItem & {
	isFavorite?: boolean;
	toggleFavorite?: (id: string, isFavorite: boolean) => void;
};

export const Card = ({
	id,
	value,
	toggleFavorite,
	isFavorite = false,
}: CardProps): JSX.Element => {
	const handleFavorite = () => {
		toggleFavorite && toggleFavorite(id, isFavorite);
	};

	return (
		<div className={styles.card}>
			<span
				data-testid='FavoriteIcon'
				className={clsx(styles.starIcon, isFavorite && styles.favorite)}
				onClick={handleFavorite}>
				<StarBorderOutlined />
				<StarOutlined />
			</span>
			{value}
		</div>
	);
};
