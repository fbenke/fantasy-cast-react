import axios from 'axios'

export const AUTH_USER = 'auth_user'
export const UNAUTH_USER = 'unauth_user'
export const AUTH_ERROR = 'auth_error'

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
