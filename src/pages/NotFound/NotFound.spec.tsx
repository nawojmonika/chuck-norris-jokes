import { render, screen } from '@testing-library/react';
import { NotFound } from './index';

describe('NotFound page', () => {
	test('Should render empty component', () => {
		render(<NotFound />);
		const empty = screen.getByTestId('Empty');
		expect(empty).toBeVisible();
	});
	test('Should render NotFound Page title', () => {
		render(<NotFound />);
		const title = screen.getByText(
			'Jokes on you, the page you are looking for does not exist!'
		);
		expect(title).toBeVisible();
	});
});
