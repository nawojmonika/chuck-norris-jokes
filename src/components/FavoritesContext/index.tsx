import { createContext, useContext, useEffect, useState } from 'react';

type FavoritesContextData = {
	favorites: string[];
	errorVisible: boolean;
	addFavorite: (id: string) => void;
	removeFavorite: (id: string) => void;
	handleErrorClose: () => void;
};

type Props = {
	children: React.ReactNode;
	maxOptions?: number;
};

export const FavoritesContext = createContext<FavoritesContextData>({
	favorites: [],
	errorVisible: false,
	addFavorite: () => undefined,
	removeFavorite: () => undefined,
	handleErrorClose: () => undefined,
});

export const useFavoritesContext = (): FavoritesContextData => {
	return useContext(FavoritesContext);
};

export const FavoritesWrapper = ({
	children,
	maxOptions = 10,
}: Props): JSX.Element => {
	const [favorites, setFavorites] = useState<string[]>([]);
	const [errorVisible, setErrorVisible] = useState<boolean>(false);

	const updateFavorites = (items: string[]): void => {
		setFavorites(items);
		localStorage.setItem('favorites', JSON.stringify(items));
	};

	const addFavorite = (id: string): void => {
		if (favorites.length < maxOptions) {
			updateFavorites([...favorites, id]);
		} else {
			setErrorVisible(true);
		}
	};

	const removeFavorite = (id: string): void => {
		const updated = favorites.filter((item) => item !== id);
		updateFavorites(updated);
	};

	const handleErrorClose = () => {
		setErrorVisible(false);
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
			value={{
				favorites,
				errorVisible,
				addFavorite,
				removeFavorite,
				handleErrorClose,
			}}>
			{children}
		</FavoritesContext.Provider>
	);
};
