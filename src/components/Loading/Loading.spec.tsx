import { render, screen } from '@testing-library/react';
import { Loading } from './index';

describe('Loading component', () => {
	test('Should render image of Chuck', () => {
		render(<Loading />);
		const altText = screen.getByAltText('Happy Chuck image');
		expect(altText).toBeInTheDocument();
	});
});
