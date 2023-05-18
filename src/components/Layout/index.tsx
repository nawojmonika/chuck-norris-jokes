import { Outlet } from 'react-router-dom';
import { FavoritesWrapper } from '../FavoritesContext';
import { Nav } from './components/Nav';

export const Layout = (): JSX.Element => {
	return (
		<div>
			<Nav />
			<FavoritesWrapper>
				<Outlet />
			</FavoritesWrapper>
		</div>
	);
};
