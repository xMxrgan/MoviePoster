import "../App.css";
import { useMovieContext } from "../context/MovieContext";

export function MovieCard({
    movie,
}: {
    movie: {
        id?: number;
        title: string;
        release_date?: string;
        url?: string;
        poster_path?: string;
    };
}) {
    const { isFavorite, removeFromFavorite, addToFavorite } = useMovieContext();
    const favorite = movie.id ? isFavorite(movie.id) : false;

    const onLike = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        addToFavorite(movie);
        if (favorite && movie.id) removeFromFavorite(movie.id);
    };

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                />

                <div className="movie-overlay"></div>

                <button className="like-btn" onClick={onLike}>
                    ❤️
                </button>
            </div>
            <div className="movie-description">
                <h3>{movie.title}</h3>
                <p>{movie.release_date}</p>
            </div>
        </div>
    );
}
