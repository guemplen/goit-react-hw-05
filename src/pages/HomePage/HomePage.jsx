import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../api/tmdb';
import MovieList from '../../components/MovieList/MovieList';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const trendingMovies = await fetchTrendingMovies();
      setMovies(trendingMovies);
    };
    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
