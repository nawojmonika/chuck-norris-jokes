import { createContext, useContext, useState } from 'react';

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

	const addFavorite = (id: string) => {
		if (favorites.length < maxOptions) {
			setFavorites([...favorites, id]);
		}
	};

	const removeFavorite = (id: string) => {
		const updated = favorites.filter((item) => item !== id);
		setFavorites(updated);
	};

	return (
		<FavoritesContext.Provider
			value={{ favorites, addFavorite, removeFavorite }}>
			{children}
		</FavoritesContext.Provider>
	);
};
