import axios from 'axios'
import { FETCH_ADDITIONAL_MOVIE_INFO, TMDB_MOVIE_URL } from './movie'

export const CREATE_REMAKE = 'create_remake'
export const FETCH_REMAKES = 'fetch_remakes'
export const FETCH_REMAKE = 'fetch_remake'
export const FETCH_REMAKE_ERROR = 'fetch_remake_error'
export const DELETE_REMAKE = 'delete_remake'
export const CLOSE_REMAKE = 'close_remake'
export const RESET_TMDB_DETAILS = 'reset_tmdb_details'

export const REMAKE_URL = `${process.env.API_URL}api/remakes/`

export function fetchRemakes () {
  const request = axios.get(`${REMAKE_URL}`)

  return {
    type: FETCH_REMAKES,
    payload: request
  }
}

export function createRemake (values, callback) {
  const request = axios.post(
    `${REMAKE_URL}add/`, values,
    {headers: { Authorization: `Token ${localStorage.getItem('token')}` }}
  )
    .then(() => callback())

  return {
    type: CREATE_REMAKE,
    payload: request
  }
}

export function fetchRemake (id) {
  return function (dispatch) {
    dispatch({type: RESET_TMDB_DETAILS})
    axios.get(`${REMAKE_URL}${id}`)
      .then(response => {
        dispatch({
          type: FETCH_REMAKE,
          payload: response
        })
        axios.get(`${TMDB_MOVIE_URL}movie/${response.data.movie.id}`, {
          headers: { Authorization: `Token ${localStorage.getItem('token')}` }
        }).then(response => {
          dispatch({
            type: FETCH_ADDITIONAL_MOVIE_INFO,
            payload: response
          })
        })
      }).catch(error => {
        dispatch({
          type: FETCH_REMAKE_ERROR,
          payload: error
        })
      })
  }
}

export function deleteRemake (id, callback) {
  axios.delete(
    `${REMAKE_URL}${id}`,
    {headers: { Authorization: `Token ${localStorage.getItem('token')}` }}
  )
    .then(() => callback())

  return {
    type: DELETE_REMAKE,
    payload: id
  }
}

export function closeRemake (id, callback) {
  axios.get(
    `${REMAKE_URL}close/${id}`,
    {headers: { Authorization: `Token ${localStorage.getItem('token')}` }}
  )
    .then(() => callback())

  return {
    type: CLOSE_REMAKE,
    payload: id
  }
}
