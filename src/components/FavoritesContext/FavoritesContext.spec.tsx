/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
	FavoritesWrapper,
	FavoritesWrapperProps,
	useFavoritesContext,
} from './index';
import { act } from 'react-dom/test-utils';
import { SnackbarProvider } from 'notistack';

const ContextConsumer = (): JSX.Element => {
	const { favorites, addFavorite, removeFavorite } = useFavoritesContext();
	return (
		<>
			<div data-testid='Favorites'>
				{favorites.map((id) => (
					<span key={id}>{id}</span>
				))}
			</div>
			<button onClick={() => addFavorite(`${Math.random()}`)}>Add</button>
			<button onClick={() => removeFavorite(`${favorites.pop()}`)}>
				Remove
			</button>
		</>
	);
};

type SetUpResult = {
	addButton: HTMLElement;
	removeButton: HTMLElement;
	favorites: HTMLElement;
};

const setUp = (props?: Partial<FavoritesWrapperProps>): SetUpResult => {
	render(
		<SnackbarProvider>
			<FavoritesWrapper {...props}>
				<ContextConsumer />
			</FavoritesWrapper>
		</SnackbarProvider>
	);
	const addButton = screen.getByText('Add');
	const removeButton = screen.getByText('Remove');
	const favorites = screen.getByTestId('Favorites');
	return {
		addButton,
		removeButton,
		favorites,
	};
};

describe('FavoriteWrapper component', () => {
	beforeEach(() => {
		window.localStorage.clear();
	});

	test('Context consumer should be able to add favorite item', async () => {
		const { addButton, favorites } = setUp();
		act(() => {
			userEvent.click(addButton);
		});
		expect(favorites.childNodes).toHaveLength(1);
	});

	test('Context consumer should be able to add multiple favorite items', async () => {
		const { addButton, favorites } = setUp();
		const times = 5;

		for (let i = 0; i < times; i++) {
			act(() => {
				userEvent.click(addButton);
			});
		}
		expect(favorites.childNodes).toHaveLength(5);
	});

	test('Context consumer should not be able to add more than 10 favorite items on default', async () => {
		const { addButton, favorites } = setUp();
		const times = 10;

		for (let i = 0; i < times; i++) {
			act(() => {
				userEvent.click(addButton);
			});
		}
		expect(favorites.childNodes).toHaveLength(10);
	});

	test('Context consumer should not be able to add more than maxItems limit', async () => {
		const { addButton, favorites } = setUp({ maxItems: 3 });
		const times = 10;

		for (let i = 0; i < times; i++) {
			act(() => {
				userEvent.click(addButton);
			});
		}
		expect(favorites.childNodes).toHaveLength(3);
	});

	test('Context consumer should be able to remove favorite items', async () => {
		const { addButton, removeButton, favorites } = setUp();
		const times = 5;

		for (let i = 0; i < times; i++) {
			act(() => {
				userEvent.click(addButton);
			});
		}
		act(() => {
			userEvent.click(removeButton);
		});
		expect(favorites.childNodes).toHaveLength(4);
	});

	test('Success notification is showing on adding favorite item', async () => {
		const { addButton } = setUp();
		act(() => {
			userEvent.click(addButton);
		});
		const successNotification = screen.getByText(
			'Joke succesfully marked as favorite!'
		);
		expect(successNotification).toBeVisible();
	});

	test('Success notification is showing on removing favorite item', async () => {
		const { addButton, removeButton } = setUp();
		act(() => {
			userEvent.click(addButton);
		});
		act(() => {
			userEvent.click(removeButton);
		});
		const successNotification = screen.getByText(
			'Joke succesfully removed from favorites!'
		);
		expect(successNotification).toBeVisible();
	});

	test('Error notification is showing on trying to add more favorite items than set maxItems', async () => {
		const { addButton } = setUp({ maxItems: 2 });
		const times = 3;

		for (let i = 0; i < times; i++) {
			act(() => {
				userEvent.click(addButton);
			});
		}
		const errorNotification = screen.getByText(
			'You can only mark 2 jokes as favorite!'
		);
		expect(errorNotification).toBeVisible();
	});
});
