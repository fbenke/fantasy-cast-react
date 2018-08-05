import axios from 'axios';
import { AUTH_URL } from '../helpers/constants';
import history from '../helpers/history';
import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  AUTH_DETAIL,
} from './types';

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}

export function authSuccess(token) {
  window.localStorage.setItem('token', token);
  history.push('/remakes/');
  return { type: AUTH_USER };
}

export const signinUser = formProps => (dispatch) => {
  axios.post(`${AUTH_URL}signin/`, formProps)
    .then((response) => {
      dispatch(authSuccess(response.data.token));
    })
    .catch((error) => {
      dispatch(authError(error.response.data));
    });
};

export const signupUser = formProps => (dispatch) => {
  axios.post(`${AUTH_URL}signup/`, formProps)
    .then((response) => {
      dispatch(authSuccess(response.data.token));
    })
    .catch((error) => {
      dispatch(authError(error.response.data));
    });
};

export function signoutUser() {
  window.localStorage.removeItem('token');
  return { type: UNAUTH_USER };
}

export function getUserDetails() {
  const request = axios.get(
    `${AUTH_URL}detail/`,
    { headers: { Authorization: `Token ${window.localStorage.getItem('token')}` } },
  );

  return {
    type: AUTH_DETAIL,
    payload: request,
  };
}
