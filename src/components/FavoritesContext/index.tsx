import { createContext, useContext, useEffect, useState } from 'react';

type FavoritesContextData = {
	favorites: string[];
	addFavorite: (id: string) => void;
	removeFavorite: (id: string) => void;
};

type Props = {
	children: React.ReactNode;
	maxOptions?: number;
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
	maxOptions = 10,
}: Props): JSX.Element => {
	const [favorites, setFavorites] = useState<string[]>([]);

	const updateFavorites = (items: string[]): void => {
		setFavorites(items);
		localStorage.setItem('favorites', JSON.stringify(items));
	};

	const addFavorite = (id: string): void => {
		if (favorites.length < maxOptions) {
			updateFavorites([...favorites, id]);
		}
	};

	const removeFavorite = (id: string): void => {
		const updated = favorites.filter((item) => item !== id);
		updateFavorites(updated);
	};

	useEffect(() => {
		let ignore = false;

		if (!ignore) {
			const items = localStorage.getItem('favorites') || '';
			setFavorites(JSON.parse(items));
		}

		return () => {
			ignore = true;
		};
	}, []);

	return (
		<FavoritesContext.Provider
			value={{ favorites, addFavorite, removeFavorite }}>
			{children}
		</FavoritesContext.Provider>
	);
};