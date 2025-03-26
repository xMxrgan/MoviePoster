import "../App.css";
import { useMovieContext } from "../context/MovieContext";
import { MovieCard } from "../components/MovieCard";
import { useState } from "react";

function Favorite() {
    const { favorites } = useMovieContext();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    // Filtrare i preferiti in base alla ricerca
    const filteredFavorites = favorites.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <div className="favorites">
            <input
                type="text"
                placeholder="Search favorites..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
            />
            {filteredFavorites.length > 0 ? (
                filteredFavorites.map((movie) => (
                    <MovieCard movie={movie} key={movie.id} />
                ))
            ) : (
                <div className="favorite-empty">
                    <h2>No favorite movies</h2>
                    <p>Start adding movies to your favorites</p>
                </div>
            )}
        </div>
    );
}

export default Favorite;
