import { CardItem } from '../../api';
import { Card } from './components/Card';
import styles from './CardList.module.css';

type Props = {
	list: CardItem[];
};

export const CardList = ({ list = [] }: Props): JSX.Element => {
	return (
		<div className={styles.container}>
			<h2 className={styles.header}>Chuck out those jokes:</h2>
			<div className={styles.list}>
				{list.map((item) => (
					<Card key={item.id} {...item} />
				))}
			</div>
		</div>
	);
};
