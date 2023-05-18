import { Outlet } from 'react-router-dom';
import { FavoritesWrapper } from '../FavoritesContext';
import { Nav } from './components/Nav';
import { SnackbarProvider } from 'notistack';
import styles from './Layout.module.css';

export const Layout = (): JSX.Element => {
	return (
		<>
			<Nav />
			<div className={styles.container}>
				<SnackbarProvider>
					<FavoritesWrapper>
						<Outlet />
					</FavoritesWrapper>
				</SnackbarProvider>
			</div>
		</>
	);
};
