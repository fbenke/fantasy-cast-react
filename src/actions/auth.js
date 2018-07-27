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
    payload: { ...error, password: error.password1 },
  };
}

export const signinUser = formProps => (dispatch) => {
  axios.post(
    `${AUTH_URL}signin/`,
    formProps,
  )
    .then((response) => {
      dispatch({ type: AUTH_USER });
      window.localStorage.setItem('token', response.data.token);
      history.push('/remakes/');
    })
    .catch((error) => {
      dispatch(authError(error.response.data));
    });
};

export const signupUser = formProps => (dispatch) => {
  const {
    email, password, passwordConfirm, username,
  } = formProps;

  axios.post(
    `${AUTH_URL}signup/`,
    {
      email, username, password1: password, password2: passwordConfirm,
    },
  )
    .then((response) => {
      dispatch({ type: AUTH_USER });
      window.localStorage.setItem('token', response.data.token);
      history.push('/remakes/');
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
