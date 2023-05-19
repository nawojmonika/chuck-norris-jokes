import { render, screen } from '@testing-library/react';
import { CardList, CardListProps } from './index';
import { mockCards } from '../../testUtils';

type SetUpResult = {
	title: HTMLElement | null;
};

const setUp = (props?: Partial<CardListProps>): SetUpResult => {
	render(<CardList list={mockCards} {...props} />);
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
		const cardContent1 = screen.getByText(mockCards[0].value);
		const cardContent2 = screen.getByText(mockCards[1].value);
		expect(cardContent1).toBeVisible();
		expect(cardContent2).toBeVisible();
	});
});
