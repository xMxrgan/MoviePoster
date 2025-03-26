import { MovieCard } from "../components/MovieCard";
import "../App.css";
import { useState, useEffect } from "react";
import { getPopularMovie } from "../services/API";

// Definizione dell'interfaccia Movie
interface Movie {
    id: number;
    title: string;
    release_date?: string;
    poster_path?: string;
    url?: string;
}

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPopularMovie = async () => {
            try {
                const popularMovies: Movie[] = await getPopularMovie();

                // Modifica per aggiungere l'URL dell'immagine
                const moviesWithImage: Movie[] = popularMovies.map(
                    (movie: Movie) => ({
                        ...movie,
                        url: movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                            : "https://via.placeholder.com/500",
                    }),
                );

                setMovies(moviesWithImage);
            } catch (err) {
                console.log(err);
                setError("Failed to load movies...");
            } finally {
                setLoading(false);
            }
        };

        loadPopularMovie();
    }, []);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert(searchQuery);
        setSearchQuery("Again...");
    };

    return (
        <div className="Home">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for movies..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                    }}
                />
                <button type="submit" className="search-btn">
                    Search
                </button>
            </form>
            {loading && <p>Loading movies...</p>}
            {error && <p className="error-message">{error}</p>}
            <div className="movie-list">
                {movies.map(
                    (movie) =>
                        movie.title
                            .toLowerCase()
                            .startsWith(searchQuery.toLowerCase()) && (
                            <MovieCard movie={movie} key={movie.id} />
                        ),
                )}
            </div>
        </div>
    );
}

export default Home;
