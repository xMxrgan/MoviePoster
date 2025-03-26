import { createContext, useState, useEffect, useContext } from "react";

// Definisci un tipo per il film
type Movie = {
    id: number;
    title: string;
    poster_path?: string;
    release_date?: string;
};

// Creazione del contesto
const MovieContext = createContext<{
    favorites: Movie[];
    setFavorites: React.Dispatch<React.SetStateAction<Movie[]>>;
    addToFavorite: (movie: Movie) => void;
    removeFromFavorite: (movieId: number) => void;
    isFavorite: (movieId: number) => boolean;
}>({
    favorites: [],
    setFavorites: () => {},
    addToFavorite: () => {},
    removeFromFavorite: () => {},
    isFavorite: () => false,
});

export const useMovieContext = () => useContext(MovieContext);

// Provider del contesto
export const MovieProvider = ({ children }: { children: React.ReactNode }) => {
    const [favorites, setFavorites] = useState<Movie[]>([]);

    // Carica i preferiti dal localStorage quando il componente è montato
    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites");
        if (storedFavs) setFavorites(JSON.parse(storedFavs));
    }, []);

    // Salva i preferiti nel localStorage ogni volta che la lista cambia
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    // Aggiungi un film ai preferiti
    const addToFavorite = (movie: Movie) => {
        if (!isFavorite(movie.id)) {
            setFavorites((prevFavorites) => [...prevFavorites, movie]);
        }
    };

    // Rimuovi un film dai preferiti
    const removeFromFavorite = (movieId: number) => {
        setFavorites((prevFavorites) =>
            prevFavorites.filter((movie) => movie.id !== movieId),
        );
    };

    // Controlla se un film è già nei preferiti
    const isFavorite = (movieId: number) => {
        return favorites.some((movie) => movie.id === movieId);
    };

    return (
        <MovieContext.Provider
            value={{
                favorites,
                setFavorites,
                addToFavorite,
                removeFromFavorite,
                isFavorite,
            }}
        >
            {children}
        </MovieContext.Provider>
    );
};
