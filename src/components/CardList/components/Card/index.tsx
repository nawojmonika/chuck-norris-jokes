import { CardItem } from '../../../../api';

type Props = CardItem;

export const Card = ({ id, value }: Props) => {
	return <div>{value}</div>;
};
