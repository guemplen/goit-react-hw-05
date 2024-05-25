import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../api/tmdb';
import MovieList from '../../components/MovieList/MovieList';
import styles from './moviesPage.module.css';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('query') || '';
  const [query, setQuery] = useState(queryParam);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = useCallback(
    async e => {
      if (e) e.preventDefault();
      if (query.trim() === '') {
        setError('Please enter a search term');
        return;
      }
      try {
        const results = await searchMovies(query);
        setMovies(results);
        setError(null);
        setSearchParams({ query });
      } catch (error) {
        setError('Failed to fetch movies');
      }
    },
    [query, setSearchParams]
  );

  useEffect(() => {
    if (queryParam) {
      handleSearch();
    }
  }, [queryParam, handleSearch]);

  return (
    <div className={styles.container}>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Enter movie name"
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
