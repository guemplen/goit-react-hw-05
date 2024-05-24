import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../api/tmdb';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsData = await fetchMovieReviews(movieId);
      setReviews(reviewsData);
    };

    fetchReviews();
  }, [movieId]);

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
