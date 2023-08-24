import { useEffect, useState } from 'react';

import MovieCard from './MovieCard';
import './App.css';
import SearchIcon from './search.svg';

// 4084c83e

const API_URL = 'https://www.omdbapi.com?apikey=4084c83e';


const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
  
    const searchMovies = async (title) => {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
  
      setMovies(data.Search);
    };
  
    useEffect(() => {
      searchMovies('Spiderman');
    }, []);
  
    return (
      <div className="app">
        <h1>MovieMania</h1>
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
        <div className="container">
          {movies?.length > 0 ? (
            <div className="container">
              {movies.map((movie, index) => {
                return <MovieCard key={index} movie={movie} />;
              })}
            </div>
          ) : (
            <div className="empty">
              <h2>No movies found</h2>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default App;
