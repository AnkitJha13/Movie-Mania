import React, { useState, useEffect } from 'react';

const API_URL = 'https://www.omdbapi.com?apikey=4084c83e';

const MovieCard = ({ movie }) => {
  const [genres, setGenres] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(`${API_URL}&i=${movie.imdbID}`);
        const movieData = await response.json();

        if (movieData.Genre) {
          const movieGenres = movieData.Genre.split(',').map((genre) => genre.trim());
          setGenres(movieGenres);
        }
      } catch (error) {
        console.error('Error fetching movie genres:', error);
      }
    };

    fetchGenres();
  }, [movie.imdbID]);

  const imdbLink = `https://www.imdb.com/title/${movie.imdbID}/`;
  const youtubeLink = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${movie.Title} ${movie.Year} trailer`
  )}`;

  return (
    <div
      className={`movie ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="release-year">
        <p>{movie.Year}</p>
      </div>

      <div>
        <img
          src={
            movie.Poster !== 'N/A'
              ? movie.Poster
              : 'https://via.placeholder.com/400'
          }
          alt={movie.Title}
        />
      </div>

      <div className="movie-info">
        <h3 className="movie-title">{movie.Title}</h3>

        {genres.length > 0 && (
          <p className="movie-genres">Genres: {genres.join(', ')}</p>
        )}

        {movie.imdbRating && (
          <p className="movie-rating">IMDb Rating: {movie.imdbRating}</p>
        )}

        {movie.BoxOffice && (
          <p className="movie-box-office">Box Office: {movie.BoxOffice}</p>
        )}

        <a
          href={imdbLink}
          target="_blank"
          rel="noopener noreferrer"
          className="movie-imdb-link"
        >
          IMDb Link
        </a>

        <a
          href={youtubeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="movie-trailer-link"
        >
          Watch Trailer
        </a>
      </div>
    </div>
  );
};

export default MovieCard;
