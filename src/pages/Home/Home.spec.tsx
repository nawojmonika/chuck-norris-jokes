/* eslint-disable testing-library/await-async-utils */
import { render, screen, waitFor } from '@testing-library/react';
import { Home } from './index';
import { mockCards } from '../../testUtils';
import { genericErrorResponse } from '../../api';

describe('Home page tests', () => {
	test('Should render loading state at first', () => {
		render(<Home />);
		const loading = screen.getByTestId('Loading');
		expect(loading).toBeVisible();
	});
	test('Should render Empty component when api returns empty list', () => {
		jest.mock('../../api', () => ({
			fetchJoke: jest.fn(() => Promise.resolve([])),
		}));
		render(<Home />);
		waitFor(() => {
			const empty = screen.getByTestId('Empty');
			expect(empty).toBeVisible();
		});
	});
	test('Should render CardList component when api returns list', () => {
		jest.mock('../../api', () => ({
			fetchJoke: jest.fn(() => Promise.resolve(mockCards)),
		}));
		render(<Home />);
		waitFor(() => {
			const cardList = screen.getByTestId('CardList');
			expect(cardList).toBeVisible();
		});
	});
	test('Should render error notification on api fail', () => {
		jest.mock('../../api', () => ({
			fetchJoke: jest.fn(() => Promise.reject('upsss')),
		}));
		render(<Home />);
		waitFor(() => {
			const errorNotification = screen.getByText(genericErrorResponse);
			expect(errorNotification).toBeVisible();
		});
	});
});
