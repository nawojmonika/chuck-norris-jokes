import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Nav } from './index';

const setUp = (): void => {
	render(
		<Router>
			<Routes>
				<Route path='/' element={<Nav />}>
					<Route index element={<></>} />
					<Route path='favorites' element={<></>} />
				</Route>
			</Routes>
		</Router>
	);
};

describe('Nav component', () => {
	test('Should render Page title', () => {
		setUp();
		const title = screen.getByText('Chuck Norris jokes');
		expect(title).toBeVisible();
	});
	test('Should render Home page link', () => {
		setUp();
		const homeLink = screen.getByText('Home');
		expect(homeLink).toBeVisible();
		expect(homeLink).toHaveAttribute('href', '/');
	});
	test('Should render Favorites page link', () => {
		setUp();
		const favoritesLink = screen.getByText('Favorites');
		expect(favoritesLink).toBeVisible();
		expect(favoritesLink).toHaveAttribute('href', '/favorites');
	});
});
