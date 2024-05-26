import { useEffect, useState } from 'react';
import {
  useParams,
  Route,
  NavLink,
  useNavigate,
  Routes,
  useLocation,
} from 'react-router-dom';
import { fetchMovieDetails } from '../../api/tmdb';
import MovieCast from '../../components/MovieCast/MovieCast';
import MovieReviews from '../../components/MovieReviews/MovieReviews';
import styles from './movieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const movieData = await fetchMovieDetails(movieId);
        setMovie(movieData);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchDetails();
  }, [movieId]);

  const handleGoBack = () => {
    const { from } = location.state || {};
    if (from) {
      navigate(from);
    } else {
      navigate('/movies');
    }
  };

  return (
    <div className={styles.container}>
      <button onClick={handleGoBack} className={styles.goBackButton}>
        Go back
      </button>
      {movie && (
        <>
          <div className={styles.movieDetails}>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className={styles.posterImage}
              />
            )}
            <div className={styles.movieInfo}>
              <h1>
                {movie.title} ({new Date(movie.release_date).getFullYear()})
              </h1>
              <p>
                <strong>User Score:</strong>{' '}
                {Math.round(movie.vote_average * 10)}%
              </p>
              <h2>Overview</h2>
              <p>{movie.overview}</p>
              <h2>Genres</h2>
              <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
            </div>
          </div>
          <div className={styles.additionalInfo}>
            <h2>Additional information</h2>
            <ul>
              <li>
                <NavLink
                  to="cast"
                  state={{ from: location.state?.from }}
                  className={({ isActive }) =>
                    isActive ? styles.active : styles.link
                  }
                >
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="reviews"
                  state={{ from: location.state?.from }}
                  className={({ isActive }) =>
                    isActive ? styles.active : styles.link
                  }
                >
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>
          <Routes>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default MovieDetailsPage;
