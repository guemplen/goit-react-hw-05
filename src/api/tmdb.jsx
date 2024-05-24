import axios from 'axios';

const API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTA3Njc2NTRmY2JlYzUwODk5MmRlMTA4MDljNjQxNiIsInN1YiI6IjY2NGRjNGY2NDMxNjhhODYyOTM0OWNjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3FTEKzW4lmk_nToE5FoenLQz_XdOVYq1fPvzzBp5J5Q';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const fetchTrendingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/trending/movie/day`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return response.data.results;
};

const searchMovies = async query => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: { query },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return response.data.results;
};

const fetchMovieDetails = async movieId => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return response.data;
};

const fetchMovieCredits = async movieId => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return response.data.cast;
};

const fetchMovieReviews = async movieId => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return response.data.results;
};

export {
  fetchTrendingMovies,
  searchMovies,
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieReviews,
  IMAGE_BASE_URL,
};
