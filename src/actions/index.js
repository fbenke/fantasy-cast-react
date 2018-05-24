import axios from 'axios'
import {
  CREATE_REMAKE,
  FETCH_REMAKES,
  FETCH_REMAKE,
  DELETE_REMAKE,
  FETCH_MOVIE_SUGGESTIONS,
  MOVIE_ERROR,
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR
} from './types'

const REMAKE_URL = `${process.env.API_URL}api/remakes/`
const AUTH_URL = `${process.env.API_URL}api/account/`

export function signinUser ({ email, password }, callback) {
  return function (dispatch) {
    axios.post(`${AUTH_URL}signin/`, {username: email, password})
      .then(response => {
        dispatch({ type: AUTH_USER })
        localStorage.setItem('token', response.data.token)
        callback()
      })
      .catch(error => {
        dispatch(authError(error.response.data))
      })
  }
}

export function signupUser ({ email, password, passwordConfirm }, callback) {
  return function (dispatch) {
    axios.post(`${AUTH_URL}signup/`, {email, password1: password, password2: passwordConfirm})
      .then(response => {
        dispatch({ type: AUTH_USER })
        localStorage.setItem('token', response.data.token)
        callback()
      })
      .catch(error => {
        dispatch(authError(error.response.data))
      })
  }
}

export function authError (error) {
  // field name mapping
  error.password = error.password1

  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser () {
  localStorage.removeItem('token')
  return { type: UNAUTH_USER }
}

export function fetchRemakes () {
  const request = axios.get(`${REMAKE_URL}`)

  return {
    type: FETCH_REMAKES,
    payload: request
  }
}

export function createRemake (values, callback) {
  const request = axios.post(`${REMAKE_URL}`, values)
    .then(() => callback())

  return {
    type: CREATE_REMAKE,
    payload: request
  }
}

export function fetchRemake (id) {
  const request = axios.get(`${REMAKE_URL}${id}`)

  return {
    type: FETCH_REMAKE,
    payload: request
  }
}

export function deleteRemake (id, callback) {
  axios.delete(`${REMAKE_URL}${id}`)
    .then(() => callback())

  return {
    type: DELETE_REMAKE,
    payload: id
  }
}

export function fetchMovieSuggestions (query) {
  const payload = [
    { id: '1', name: 'Dawn of the Dead' },
    { id: '2', name: 'Zombieland' },
    { id: '3', name: 'Shaun of the Dead' },
    { id: '4', name: 'Big' },
    { id: '5', name: 'Interstellar' }
  ]

  var suggestions = payload.filter(i => i.name.toLowerCase().indexOf(query.toLowerCase()) !== -1)

  return {
    type: FETCH_MOVIE_SUGGESTIONS,
    payload: {
      suggestions: suggestions,
      notFound: suggestions.length == 0
    }
  }
}
