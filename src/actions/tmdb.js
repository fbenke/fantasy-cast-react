import axios from 'axios';

import { TMDB_MOVIE_URL } from '../helpers/constants';

import {
  FETCH_TMDB_DETAILS,
  FETCH_TMDB_DETAILS_ERRORS,
} from './types';


export const fetchAdditionalMovieInfo = id => (dispatch) => {
  axios.get(`${TMDB_MOVIE_URL}movie/remake/${id}`, {
    headers: { Authorization: `Token ${window.localStorage.getItem('token')}` },
  }).then((response) => {
    dispatch({
      type: FETCH_TMDB_DETAILS,
      payload: response,
    });
  }).catch((error) => {
    dispatch({
      type: FETCH_TMDB_DETAILS_ERRORS,
      payload: error,
    });
  });
};
