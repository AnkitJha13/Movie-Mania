import React from "react";

const MovieCard = ({ movie }) => {
    console.log("Movie object:", movie);
    return (
        <div className="movie">
            <div>
                <p>{movie.Year}</p>
            </div>

            <div>
                <img
                    src={
                        movie.Poster !== "N/A"
                            ? movie.Poster
                            : "https://via.placeholder.com/400"
                    }
                    alt={movie.title}
                />
            </div>

            <div className="movie-info">
                <span className="movie-type">{movie.Type}</span>
                <h3 className="movie-title">{movie.Title}</h3>
                {movie.imdbRating && (
                    <p className="movie-rating">IMDb Rating: {movie.imdbRating}</p>
                )}
            </div>
        </div>
    );
};

export default MovieCard;
