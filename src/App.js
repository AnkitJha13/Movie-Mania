import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import './App.css';
import SearchIcon from './search.svg';

const API_URL = 'https://www.omdbapi.com?apikey=4084c83e';

const App = () => {
  
  // State to hold the list of movies and the search term
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Function to search for movies based on the provided title
  const searchMovies = async (title) => {
    try {

      // Fetch movie data from OMDB API using the provided title
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();

      // Check if the search returned any results
      if (data.Search) {

        // Fetch additional details for each movie, including IMDb rating and Box Office
        const moviesWithRatings = await Promise.all(
          data.Search.map(async (movie) => {
            try {
              const response = await fetch(`${API_URL}&i=${movie.imdbID}`);
              const movieData = await response.json();

              // Add IMDb rating and Box Office details to the movie object
              return {
                ...movie,
                imdbRating: movieData.imdbRating,
                BoxOffice: movieData.BoxOffice,
              };
            } catch (error) {
              console.error('Error fetching movie details:', error);
              return movie; // Return the original movie object if there is an error fetching details
            }
          })
        );

        // Update the movies state with the enhanced movie data
        setMovies(moviesWithRatings);
      } else {
        // If no results were found, set movies state to an empty array
        setMovies([]);
      }
    } catch (error) {
      console.error('Error searching movies:', error);
      setMovies([]);  // Set movies state to an empty array in case of an error
    }
  };

  // useEffect hook to initially search for movies when the component mounts
  useEffect(() => {
    searchMovies('Batman');
  }, []);

  // Render the App component
  return (
    <div className="app">
      <h1>Movie Mania</h1>
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
            <MovieCard key={index} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
