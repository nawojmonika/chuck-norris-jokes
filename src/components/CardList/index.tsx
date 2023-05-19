import { CardItem } from '../../api';
import { Card } from './components/Card';
import { TransitionGroup } from 'react-transition-group';
import { Collapse } from '@mui/material';
import { useFavoritesContext } from '../FavoritesContext';
import styles from './CardList.module.css';

export type CardListProps = {
	list: CardItem[];
	title?: string;
};

export const CardList = ({
	list = [],
	title = '',
}: CardListProps): JSX.Element => {
	const { favorites, removeFavorite, addFavorite } = useFavoritesContext();
	const toggleFavorite = (id: string, isFavorite: boolean): void => {
		isFavorite ? removeFavorite(id) : addFavorite(id);
	};

	return (
		<div className={styles.container} data-testid='CardList'>
			{title && <h2 className={styles.header}>{title}</h2>}
			<TransitionGroup className={styles.list}>
				{list.map((item) => (
					<Collapse key={item.id}>
						<Card
							{...item}
							isFavorite={favorites.includes(item.id)}
							toggleFavorite={toggleFavorite}
						/>
					</Collapse>
				))}
			</TransitionGroup>
		</div>
	);
};
