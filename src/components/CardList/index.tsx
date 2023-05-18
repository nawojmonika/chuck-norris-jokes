import { CardItem } from '../../api';
import { Card } from './components/Card';
import styles from './CardList.module.css';

type Props = {
	list: CardItem[];
	title?: string;
};

export const CardList = ({ list = [], title = '' }: Props): JSX.Element => {
	return (
		<div className={styles.container}>
			{title && <h2 className={styles.header}>{title}</h2>}
			<div className={styles.list}>
				{list.map((item) => (
					<Card key={item.id} {...item} />
				))}
			</div>
		</div>
	);
};
