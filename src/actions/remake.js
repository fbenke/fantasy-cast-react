import axios from 'axios';

import { REMAKE_URL } from '../helpers/constants';
import history from '../helpers/history';

import {
  CREATE_REMAKE,
  FETCH_REMAKES,
  FETCH_REMAKE,
  FETCH_REMAKE_ERROR,
  DELETE_REMAKE,
  CLOSE_REMAKE,
  RESET_REMAKE,
} from './types';

export function fetchRemakes() {
  const request = axios.get(`${REMAKE_URL}`);

  return {
    type: FETCH_REMAKES,
    payload: request,
  };
}

export function createRemake(values) {
  const request = axios.post(
    `${REMAKE_URL}add/`, values,
    { headers: { Authorization: `Token ${window.localStorage.getItem('token')}` } },
  )
    .then(() => history.push('/remakes/'));

  return {
    type: CREATE_REMAKE,
    payload: request,
  };
}

export const fetchRemake = id => (dispatch) => {
  axios.get(`${REMAKE_URL}${id}`)
    .then((response) => {
      dispatch({
        type: FETCH_REMAKE,
        payload: response,
      });
    }).catch((error) => {
      dispatch({
        type: FETCH_REMAKE_ERROR,
        payload: error,
      });
      history.push('/');
    });
};

export function resetRemake() {
  return { type: RESET_REMAKE };
}

export function deleteRemake(id) {
  axios.delete(
    `${REMAKE_URL}${id}`,
    { headers: { Authorization: `Token ${window.localStorage.getItem('token')}` } },
  )
    .then(() => history.push('/remakes/'));

  return {
    type: DELETE_REMAKE,
    payload: id,
  };
}

export const closeRemake = id => (dispatch) => {
  axios.get(
    `${REMAKE_URL}close/${id}`,
    { headers: { Authorization: `Token ${window.localStorage.getItem('token')}` } },
  )
    .then(() => dispatch(fetchRemake(id)));

  return {
    type: CLOSE_REMAKE,
    payload: id,
  };
};
