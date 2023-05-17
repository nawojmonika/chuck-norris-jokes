import { CardItem } from '../../../../api';
import styles from './Card.module.css';

type Props = CardItem;

export const Card = ({ id, value }: Props) => {
	return <div className={styles.card}>{value}</div>;
};
