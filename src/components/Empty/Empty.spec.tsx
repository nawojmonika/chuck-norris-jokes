import { render, screen } from '@testing-library/react';
import { Empty, EmptyProps } from './index';

type SetUpResult = {
	title: HTMLElement;
};

const setUp = (props?: Partial<EmptyProps>): SetUpResult => {
	render(<Empty {...props} />);
	const title = screen.getByRole('heading', { level: 3 });
	return { title };
};

describe('Empty component', () => {
	test('Should render default title if none is passed', () => {
		const { title } = setUp();
		expect(title).toHaveTextContent('This section looks empty!');
	});
	test('Should render passed text title', () => {
		const titleContent = 'This is a test';
		const { title } = setUp({ children: titleContent });
		expect(title).toHaveTextContent(titleContent);
	});
	test('Should render passed node title', () => {
		const titleContent = (
			<span data-testId='ComplicatedTitle'>
				This is more complicated <span>title</span>
			</span>
		);
		const { title } = setUp({ children: titleContent });
		const content = screen.getByTestId('ComplicatedTitle');
		expect(title).toContainElement(content);
	});
	test('Should render sad Chuck Norris image', () => {
		setUp();
		screen.getByAltText('Sad Chuck image');
	});
});
