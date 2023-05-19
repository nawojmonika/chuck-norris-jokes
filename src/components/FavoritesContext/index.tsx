import { useSnackbar } from 'notistack';
import { createContext, useContext, useEffect, useState } from 'react';

type FavoritesContextData = {
	favorites: string[];
	addFavorite: (id: string) => void;
	removeFavorite: (id: string) => void;
};

export type FavoritesWrapperProps = {
	children: React.ReactNode;
	maxItems?: number;
};

export const FavoritesContext = createContext<FavoritesContextData>({
	favorites: [],
	addFavorite: () => undefined,
	removeFavorite: () => undefined,
});

export const useFavoritesContext = (): FavoritesContextData => {
	return useContext(FavoritesContext);
};

export const FavoritesWrapper = ({
	children,
	maxItems = 10,
}: FavoritesWrapperProps): JSX.Element => {
	const [favorites, setFavorites] = useState<string[]>([]);
	const { enqueueSnackbar } = useSnackbar();

	const updateFavorites = (items: string[]): void => {
		setFavorites(items);
		localStorage.setItem('favorites', JSON.stringify(items));
	};

	const addFavorite = (id: string): void => {
		if (favorites.length < maxItems) {
			updateFavorites([...favorites, id]);
			enqueueSnackbar('Joke succesfully marked as favorite!', {
				variant: 'success',
			});
		} else {
			enqueueSnackbar(`You can only mark ${maxItems} jokes as favorite!`, {
				variant: 'error',
			});
		}
	};

	const removeFavorite = (id: string): void => {
		const updated = favorites.filter((item) => item !== id);
		updateFavorites(updated);
		enqueueSnackbar('Joke succesfully removed from favorites!', {
			variant: 'success',
		});
	};

	useEffect(() => {
		let ignore = false;

		if (!ignore) {
			const items = localStorage.getItem('favorites') || '[]';
			setFavorites(JSON.parse(items));
		}

		return () => {
			ignore = true;
		};
	}, []);

	return (
		<FavoritesContext.Provider
			value={{
				favorites,
				addFavorite,
				removeFavorite,
			}}>
			{children}
		</FavoritesContext.Provider>
	);
};
