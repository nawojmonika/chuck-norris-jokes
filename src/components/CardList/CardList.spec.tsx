import { render, screen } from '@testing-library/react';
import { CardItem } from '../../api';
import { CardList, CardListProps } from '.';

const cards: CardItem[] = [
	{
		id: 'ixj8vHsfSmic7BGoacVkKg',
		value:
			"If you're a horse, here's a little advice: Never look a gift CHUCK NORRIS in the mouth!",
	},
	{
		id: 'kKS7Rhe3QDuMWVWKq6ZxZw',
		value: 'Chuck Norris drives to Hawaii.',
	},
];

type SetUpResult = {
	title: HTMLElement | null;
};

const setUp = (props?: Partial<CardListProps>): SetUpResult => {
	render(<CardList list={cards} {...props} />);
	const title = screen.queryByRole('heading', { level: 2 });
	return { title };
};

describe('CardList component', () => {
	test('Title element should not be rendered if no title is passed', (): void => {
		const { title } = setUp();
		expect(title).toBeNull();
	});
	test('Should render title when prop is set', (): void => {
		const titleContent = 'This is a test title';
		const { title } = setUp({ title: titleContent });
		expect(title).toHaveTextContent(titleContent);
	});
	test('Should render passed cards in a list', (): void => {
		setUp();
		const cardContent1 = screen.getByText(cards[0].value);
		const cardContent2 = screen.getByText(cards[1].value);
		expect(cardContent1).toBeVisible();
		expect(cardContent2).toBeVisible();
	});
});
