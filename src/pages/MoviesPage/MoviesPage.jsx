import { useState } from 'react';
import { searchMovies } from '../../api/tmdb';
import MovieList from '../../components/MovieList/MovieList';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async e => {
    e.preventDefault();
    if (query.trim() === '') {
      setError('Please enter a search term');
      return;
    }
    try {
      const results = await searchMovies(query);
      setMovies(results);
      setError(null);
    } catch (error) {
      setError('Failed to fetch movies');
    }
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Enter movie name"
        />
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
