import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Layout } from './index';

describe('Layout component', () => {
	test('Should render Nav component', () => {
		render(
			<Router>
				<Routes>
					<Route path='/' element={<Layout />}></Route>
				</Routes>
			</Router>
		);
		const nav = screen.getByTestId('Nav');
		expect(nav).toBeVisible();
	});
});
