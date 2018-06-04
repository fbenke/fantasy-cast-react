import axios from 'axios'

export const FETCH_MOVIE_SUGGESTIONS = 'fetch_movie_suggestions'

const MOVIE_URL = `${process.env.API_URL}api/imdb/movies/`

export function fetchMovieSuggestions (query) {
  const request = axios.get(`${MOVIE_URL}`, {
    headers: { Authorization: `Token ${localStorage.getItem('token')}` },
    params: { query: query, limit: 10 }
  })

  return {
    type: FETCH_MOVIE_SUGGESTIONS,
    payload: request
  }
}
