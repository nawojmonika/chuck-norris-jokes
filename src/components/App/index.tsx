import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Home } from '../../pages/Home';
import { Favorites } from '../../pages/Favorites';
import { NotFound } from '../../pages/NotFound';
import { Layout } from '../Layout';

export const App = (): JSX.Element => {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Home />} />
					<Route path='favorites' element={<Favorites />} />
					<Route path='*' element={<NotFound />} />
				</Route>
			</Routes>
		</Router>
	);
};
