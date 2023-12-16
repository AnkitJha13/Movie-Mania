import React, { useState, useEffect } from 'react';

const API_URL = 'https://www.omdbapi.com?apikey=4084c83e';

const MovieCard = ({ movie }) => {       // takes a movie prop as an argument
  
  // State to hold the movie genres and hover state
  const [genres, setGenres] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  // useEffect to fetch movie genres when the component mounts or movie changes
  useEffect(() => {         //to fetch movie genres when the component mounts or when the movie.imdbID changes.
    const fetchGenres = async () => {
      try {
        // Fetch movie data using IMDb ID
        const response = await fetch(`${API_URL}&i=${movie.imdbID}`);
        const movieData = await response.json();

        if (movieData.Genre) {
          // Extract genres from the response and update state
          const movieGenres = movieData.Genre.split(',').map((genre) => genre.trim());
          setGenres(movieGenres);
        }
      } catch (error) {
        console.error('Error fetching movie genres:', error);
      }
    };
    // Call fetchGenres function
    fetchGenres();
  }, [movie.imdbID]); // Dependency array to re-run effect when movie.imdbID changes

  // IMDb and YouTube links based on movie details
  const imdbLink = `https://www.imdb.com/title/${movie.imdbID}/`;
  const youtubeLink = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${movie.Title} ${movie.Year} trailer`
  )}`;

   // Render the MovieCard component
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
