import { useEffect, useState } from 'react';
import {
  useParams,
  Route,
  NavLink,
  useNavigate,
  Routes,
  useLocation,
} from 'react-router-dom';
import {
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieReviews,
} from '../../api/tmdb';
import MovieCast from '../../components/MovieCast/MovieCast';
import MovieReviews from '../../components/MovieReviews/MovieReviews';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchDetails = async () => {
      const movieData = await fetchMovieDetails(movieId);
      setMovie(movieData);
    };

    fetchDetails();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(location?.state?.from ?? '/movies');
  };

  return (
    <div>
      <button onClick={handleGoBack}>Go back</button>
      {movie && (
        <>
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <NavLink to="cast">Cast</NavLink>
          <NavLink to="reviews">Reviews</NavLink>

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
