import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import Popup from './Popup';
import './App.css';
import SearchIcon from './search.svg';

export const API_URL = 'https://www.omdbapi.com?apikey=4084c83e';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupLink, setPopupLink] = useState('');

  const searchMovies = async (title) => {
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();

      if (data.Search) {
        const moviesWithRatings = await Promise.all(
          data.Search.map(async (movie) => {
            try {
              const response = await fetch(`${API_URL}&i=${movie.imdbID}`);
              const movieData = await response.json();

              return {
                ...movie,
                imdbRating: movieData.imdbRating,
                BoxOffice: movieData.BoxOffice,
              };
            } catch (error) {
              console.error('Error fetching movie details:', error);
              return movie;
            }
          })
        );

        setMovies(moviesWithRatings);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error('Error searching movies:', error);
      setMovies([]);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setPopupLink('');
  };

  const handlePopupConfirm = () => {
    if (popupLink) {
      window.open(popupLink, '_blank');
    }
    handlePopupClose();
  };

  const handleOpenPopup = (link) => {
    setPopupLink(link);
    setShowPopup(true);
  };

  useEffect(() => {
    searchMovies('Batman');
  }, []);

  return (
    <div className="app">
      <h1 className="glowing-text">Movie Mania</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie, index) => (
            <MovieCard
              key={index}
              movie={movie}
              onOpenPopup={() => handleOpenPopup(`https://www.imdb.com/title/${movie.imdbID}/`)}
              onWatchTrailer={() => handleOpenPopup(`https://www.youtube.com/results?search_query=${encodeURIComponent(`${movie.Title} ${movie.Year} trailer`)}`)}
            />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}

      {showPopup && (
        <Popup onClose={handlePopupClose} onConfirm={handlePopupConfirm} />
      )}
    </div>
  );
};

export default App;
