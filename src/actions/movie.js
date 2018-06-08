import axios from 'axios'

export const FETCH_MOVIE_SUGGESTIONS = 'fetch_movie_suggestions'
export const RESET_MOVIE_SUGGESTIONS = 'reset_movie_suggestions'
export const SET_MOVIE_ID = 'set_movie_id'
export const FETCH_ACTOR_SUGGESTIONS = 'fetch_actor_suggestions'
export const DELETE_ACTOR = 'delete_actor'

const MOVIE_URL = `${process.env.API_URL}api/imdb/`

export function fetchMovieSuggestions (query) {
  const request = axios.get(`${MOVIE_URL}movies/`, {
    headers: { Authorization: `Token ${localStorage.getItem('token')}` },
    params: { query: query, limit: 10 }
  })

  return {
    type: FETCH_MOVIE_SUGGESTIONS,
    payload: request
  }
}

export function resetMovieSuggestions () {
  return {
    type: RESET_MOVIE_SUGGESTIONS
  }
}

export function setMovieId (id) {
  return {
    type: SET_MOVIE_ID,
    payload: id
  }
}

export function fetchActorSuggestions (id) {
  const request = axios.get(`${MOVIE_URL}principals/`, {
    headers: { Authorization: `Token ${localStorage.getItem('token')}` },
    params: { movie_id: id }
  })

  return {
    type: FETCH_ACTOR_SUGGESTIONS,
    payload: request
  }
}

export function deleteActor (id) {
  return {
    type: DELETE_ACTOR,
    payload: id
  }
}
