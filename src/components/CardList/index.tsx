import { CardItem } from '../../api';
import { Card } from './components/Card';

type Props = {
	list: CardItem[];
};

export const CardList = ({ list = [] }: Props): JSX.Element => {
	return (
		<div>
			{list.map((item) => (
				<Card key={item.id} {...item} />
			))}
		</div>
	);
};
