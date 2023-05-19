/* eslint-disable testing-library/await-async-utils */
import { render, screen, waitFor } from '@testing-library/react';
import { Favorites } from './index';
import { mockCards } from '../../testUtils';
import { genericErrorResponse } from '../../api';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

const setUp = (): void => {
	render(
		<Router>
			<Routes>
				<Route path='/' element={<Favorites />}></Route>
			</Routes>
		</Router>
	);
};

describe('Favorites page', () => {
	test('Should render Empty component when favorites are empty', () => {
		jest.mock('../../components/FavoritesContext', () => ({
			favorites: [],
		}));
		setUp();
		waitFor(() => {
			const empty = screen.getByTestId('Empty');
			expect(empty).toBeVisible();
		});
	});

	test('Should render Loading component when favorites are not empty and fetchFavorites is not resolved', () => {
		jest.mock('../../api', () => ({
			fetchFavorites: jest.fn(() => new Promise(() => {})),
		}));
		jest.mock('../../components/FavoritesContext', () => ({
			favorites: ['1'],
		}));
		setUp();
		waitFor(() => {
			const loading = screen.getByTestId('Loading');
			expect(loading).toBeVisible();
		});
	});

	test('Should render CardList component when api returns list', () => {
		jest.mock('../../api', () => ({
			fetchFavorites: jest.fn(() => Promise.resolve(mockCards)),
		}));
		jest.mock('../../components/FavoritesContext', () => ({
			favorites: ['1'],
		}));
		setUp();
		waitFor(() => {
			const cardList = screen.getByTestId('CardList');
			expect(cardList).toBeVisible();
		});
	});

	test('Should render CardList component with specific title when api returns list', () => {
		jest.mock('../../api', () => ({
			fetchFavorites: jest.fn(() => Promise.resolve(mockCards)),
		}));
		jest.mock('../../components/FavoritesContext', () => ({
			favorites: ['1'],
		}));
		setUp();
		waitFor(() => {
			const title = screen.getByText('Chuck out my favorite jokes:');
			expect(title).toBeVisible();
		});
	});

	test('Should render error notification on api fail', () => {
		jest.mock('../../api', () => ({
			fetchFavorites: jest.fn(() => Promise.reject('upsss')),
		}));
		setUp();
		waitFor(() => {
			const errorNotification = screen.getByText(genericErrorResponse);
			expect(errorNotification).toBeVisible();
		});
	});
});
