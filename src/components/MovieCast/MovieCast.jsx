// src/components/MovieCast/MovieCast.js
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits } from '../../api/tmdb';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      const castData = await fetchMovieCredits(movieId);
      setCast(castData);
    };

    fetchCast();
  }, [movieId]);

  return (
    <div>
      <h2>Cast</h2>
      <ul>
        {cast.map(actor => (
          <li key={actor.cast_id}>
            {actor.name} as {actor.character}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
