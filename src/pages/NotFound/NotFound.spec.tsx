import { render, screen } from '@testing-library/react';
import { NotFound } from './';

describe('NotFound Page', () => {
	test('Should render NotFound Page title', () => {
		render(<NotFound />);
		const title = screen.getByText(
			'Jokes on you, the page you are looking for does not exist!'
		);
		expect(title).toBeVisible();
	});
});
