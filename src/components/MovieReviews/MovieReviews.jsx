import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../api/tmdb';
import styles from './movieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsData = await fetchMovieReviews(movieId);
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (reviews.length === 0) {
    return (
      <p className={styles.noReviewsMessage}>
        We don't have any reviews for this movie.
      </p>
    );
  }

  return (
    <div className={styles.reviewsContainer}>
      <ul className={styles.reviewsList}>
        {reviews.map(review => (
          <li key={review.id} className={styles.reviewItem}>
            <h3 className={styles.reviewAuthor}>{review.author}</h3>
            <p className={styles.reviewContent}>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
