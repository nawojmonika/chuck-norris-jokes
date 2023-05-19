import { Outlet } from 'react-router-dom';
import { FavoritesWrapper } from '../FavoritesContext';
import { Nav } from './components/Nav';
import { SnackbarProvider } from 'notistack';
import styles from './Layout.module.css';

export const Layout = (): JSX.Element => {
	return (
		<div className={styles.container}>
			<Nav />
			<SnackbarProvider>
				<FavoritesWrapper>
					<Outlet />
				</FavoritesWrapper>
			</SnackbarProvider>
		</div>
	);
};
