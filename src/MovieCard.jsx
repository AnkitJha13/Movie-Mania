import React, { useState, useEffect } from 'react';

const API_URL = 'https://www.omdbapi.com?apikey=4084c83e';

const MovieCard = ({ movie }) => {
    const [isCardClicked, setIsCardClicked] = useState(false);
    const [movieDetails, setMovieDetails] = useState(null);
  
    const handleCardClick = async () => {
      setIsCardClicked(!isCardClicked);
  
      if (!movieDetails) {
        const response = await fetch(`${API_URL}&i=${movie.imdbID}`);
        const data = await response.json();
        setMovieDetails(data);
      }
    };
  
    useEffect(() => {
      if (isCardClicked && !movieDetails) {
        handleCardClick();
      }
    }, [isCardClicked]);
  
    return (
      <div className={`movie ${isCardClicked ? 'clicked' : ''}`} onClick={handleCardClick}>
        <div>
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
  
        <div>
          <span>{movie.Type}</span>
          <h3>{movie.Title}</h3>
          {isCardClicked && movieDetails && (
            <div className="movie-details">
              <p>IMDb Rating: {movieDetails.imdbRating}</p>
              <p>Release Date: {movieDetails.Released}</p>
              <p>Box Office: {movieDetails.BoxOffice}</p>
              <p>Genre: {movieDetails.Genre}</p>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default MovieCard;
