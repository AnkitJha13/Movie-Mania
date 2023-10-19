import React from "react";

const MovieCard = ({ movie }) => {
  console.log("Movie object:", movie);

  // IMDb link for the movie
  const imdbLink = `https://www.imdb.com/title/${movie.imdbID}/`;

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
          alt={movie.Title}
        />
      </div>

      <div className="movie-info">
        <span className="movie-type">{movie.Type}</span>
        <h3 className="movie-title">{movie.Title}</h3>
        {movie.imdbRating && (
          <p className="movie-rating">IMDb Rating: {movie.imdbRating}</p>
        )}

        {/* Box Office Collection */}
        {movie.BoxOffice && (
          <p className="movie-box-office">Box Office: {movie.BoxOffice}</p>
        )}

        {/* IMDb Link */}
        <a
          href={imdbLink}
          target="_blank"
          rel="noopener noreferrer"
          className="movie-imdb-link"
        >
          IMDb Link
        </a>
      </div>
    </div>
  );
};

export default MovieCard;
