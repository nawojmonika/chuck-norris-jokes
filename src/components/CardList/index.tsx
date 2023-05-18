import { CardItem } from '../../api';
import { Card } from './components/Card';
import styles from './CardList.module.css';
import { TransitionGroup } from 'react-transition-group';
import { Collapse } from '@mui/material';

type Props = {
	list: CardItem[];
	title?: string;
};

export const CardList = ({ list = [], title = '' }: Props): JSX.Element => {
	return (
		<div className={styles.container}>
			{title && <h2 className={styles.header}>{title}</h2>}
			<TransitionGroup className={styles.list}>
				{list.map((item) => (
					<Collapse key={item.id}>
						<Card {...item} />
					</Collapse>
				))}
			</TransitionGroup>
		</div>
	);
};
