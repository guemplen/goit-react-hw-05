import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits } from '../../api/tmdb';
import styles from './movieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const castData = await fetchMovieCredits(movieId);
        setCast(castData);
      } catch (error) {
        console.error('Error fetching cast:', error);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div>
      <div className={styles.container}>
        {cast.map(actor => (
          <div key={actor.cast_id} className={styles.actorCard}>
            {actor.profile_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={actor.name}
                className={styles.actorImage}
              />
            )}
            <h3 className={styles.actorName}>{actor.name}</h3>
            <p className={styles.actorRole}>{actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCast;
