import axios from 'axios'

import { TMDB_MOVIE_URL } from './movie'
export const FETCH_TMDB_DETAILS = 'fetch_tmdb_details'
export const FETCH_TMDB_DETAILS_ERRORS = 'fetch_tmdb_details_error'

export function fetchAdditionalMovieInfo (id) {
  return function (dispatch) {
    axios.get(`${TMDB_MOVIE_URL}movie/remake/${id}`, {
      headers: { Authorization: `Token ${localStorage.getItem('token')}` }
    }).then(response => {
      dispatch({
        type: FETCH_TMDB_DETAILS,
        payload: response
      })
    }).catch(error => {
      dispatch({
        type: FETCH_TMDB_DETAILS_ERRORS,
        payload: error
      })
    })
  }
}
