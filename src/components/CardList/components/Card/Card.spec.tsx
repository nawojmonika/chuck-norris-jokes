import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card, CardProps } from './index';
import { CardItem } from '../../../../api';

const card: CardItem = {
	id: 'ixj8vHsfSmic7BGoacVkKg',
	value:
		"If you're a horse, here's a little advice: Never look a gift CHUCK NORRIS in the mouth!",
};

type SetUpResult = {
	favoriteIcon: HTMLElement;
	notFavoriteIcon: HTMLElement;
	iconContainer: HTMLElement;
};

const setUp = (props?: Partial<CardProps>): SetUpResult => {
	render(<Card {...card} {...props} />);
	const notFavoriteIcon = screen.getByTestId('StarOutlinedIcon');
	const favoriteIcon = screen.getByTestId('StarBorderOutlinedIcon');
	const iconContainer = screen.getByTestId('FavoriteIcon');

	return { notFavoriteIcon, favoriteIcon, iconContainer };
};

describe('Card component', () => {
	test('Should render Card content', (): void => {
		setUp();
		const content = screen.getByText(card.value);
		expect(content).toBeInTheDocument();
	});
	test('Card should not be set as favorite by default', (): void => {
		const { notFavoriteIcon } = setUp();
		expect(notFavoriteIcon).toBeVisible();
	});
	test('Should set card as favorite', (): void => {
		const { favoriteIcon } = setUp({ isFavorite: true });
		expect(favoriteIcon).toBeVisible();
	});
	test('Should call toggleFavorite on Icon click', (): void => {
		const toggleFavorite = jest.fn();
		const { iconContainer } = setUp({ toggleFavorite });
		userEvent.click(iconContainer);
		expect(toggleFavorite).toBeCalled();
	});
	test('Should call toggleFavorite twice on Icon double click', (): void => {
		const toggleFavorite = jest.fn();
		const { iconContainer } = setUp({ toggleFavorite });
		userEvent.dblClick(iconContainer);
		expect(toggleFavorite).toBeCalled();
	});
	test('Should call toggleFavorite with id and isFavorite value', (): void => {
		const toggleFavorite = jest.fn();
		const { iconContainer } = setUp({ toggleFavorite, isFavorite: true });
		userEvent.click(iconContainer);
		expect(toggleFavorite).toBeCalledWith(card.id, true);
	});
});
