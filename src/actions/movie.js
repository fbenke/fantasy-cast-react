import axios from 'axios'
import { REMAKE_URL } from './remake'

export const FETCH_MOVIE_SUGGESTIONS = 'fetch_movie_suggestions'
export const RESET_MOVIE_SUGGESTIONS = 'reset_movie_suggestions'
export const SET_MOVIE_ID = 'set_movie_id'
export const FETCH_ACTOR_SUGGESTIONS = 'fetch_actor_suggestions'
export const FETCH_ADDITIONAL_MOVIE_INFO = 'fetch_additional_movie_info'

const IMDB_MOVIE_URL = `${process.env.API_URL}api/imdb/`
const TMDB_MOVIE_URL = `${process.env.API_URL}api/tmdb/`

export function fetchMovieSuggestions (query) {
  const request = axios.get(`${IMDB_MOVIE_URL}movies/`, {
    headers: { Authorization: `Token ${localStorage.getItem('token')}` },
    params: { query: query, limit: 15 }
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

export function setImdbId (id) {
  return dispatch => {
    dispatch({
      type: SET_MOVIE_ID,
      payload: id
    })
    if (id !== -1) {
      dispatch(fetchAdditionalMovieInfo(id))
    }
  }
}

export function fetchAdditionalMovieInfo (id) {
  return dispatch => {
    axios.get(`${TMDB_MOVIE_URL}movie/${id}`, {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` }
    }).then(response => {
      dispatch({
        type: FETCH_ADDITIONAL_MOVIE_INFO,
        payload: response
      })
      dispatch(fetchActorSuggestions(id, response.data.tmdbId))
    })
  }
}

export function fetchActorSuggestions (imdbId, tmdbId) {
  const request = axios.get(`${REMAKE_URL}characters/`, {
    headers: { Authorization: `Token ${localStorage.getItem('token')}` },
    params: { imdbId, tmdbId }
  })

  return {
    type: FETCH_ACTOR_SUGGESTIONS,
    payload: request
  }
}
