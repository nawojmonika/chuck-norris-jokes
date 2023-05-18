import { Link, Outlet } from 'react-router-dom';
import { FavoritesWrapper } from '../CardList/components/FavoritesContext';

export const Layout = (): JSX.Element => {
	return (
		<div>
			<nav>
				<ul>
					<li>
						<Link to='/'>Home</Link>
					</li>
					<li>
						<Link to='/favorites'>Favorites</Link>
					</li>
				</ul>
			</nav>
			<FavoritesWrapper>
				<Outlet />
			</FavoritesWrapper>
		</div>
	);
};
