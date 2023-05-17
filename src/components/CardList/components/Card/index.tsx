import { CardItem } from '../../../../api';
import { StarBorderOutlined, StarOutlined } from '@mui/icons-material';
import styles from './Card.module.css';

type Props = CardItem;

export const Card = ({ id, value }: Props) => {
	return (
		<div className={styles.card}>
			<span className={styles.starIcon}>
				<StarBorderOutlined />
				<StarOutlined />
			</span>
			{value}
		</div>
	);
};
