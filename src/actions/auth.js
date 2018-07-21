import axios from 'axios'

import { AUTH_URL } from '../helpers/constants'

import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  AUTH_DETAIL
} from './types'

export function signinUser (formProps, callback) {
  return function (dispatch) {
    axios.post(
      `${AUTH_URL}signin/`,
      formProps
    )
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

export function signupUser ({ email, password, passwordConfirm, username }, callback) {
  return function (dispatch) {
    axios.post(
      `${AUTH_URL}signup/`,
      {email, username, password1: password, password2: passwordConfirm}
    )
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

export function getUserDetails () {
  const request = axios.get(
    `${AUTH_URL}detail/`,
    {headers: { Authorization: `Token ${localStorage.getItem('token')}` }}
  )

  return {
    type: AUTH_DETAIL,
    payload: request
  }
}
