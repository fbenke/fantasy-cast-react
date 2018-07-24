import axios from 'axios';

import {
  IMDB_MOVIE_URL,
  TMDB_MOVIE_URL,
  REMAKE_URL,
} from '../helpers/constants';

import {
  FETCH_MOVIE_SUGGESTIONS,
  RESET_MOVIE_SUGGESTIONS,
  SET_MOVIE_ID,
  FETCH_ACTOR_SUGGESTIONS,
  FETCH_TMDB_DETAILS,
} from './types';

export function fetchMovieSuggestions(query) {
  const request = axios.get(`${IMDB_MOVIE_URL}movies/`, {
    headers: { Authorization: `Token ${window.localStorage.getItem('token')}` },
    params: { query, limit: 15 },
  });

  return {
    type: FETCH_MOVIE_SUGGESTIONS,
    payload: request,
  };
}

export function resetMovieSuggestions() {
  return {
    type: RESET_MOVIE_SUGGESTIONS,
  };
}

export function fetchActorSuggestions(imdbId, tmdbId) {
  const request = axios.get(`${REMAKE_URL}characters/`, {
    headers: { Authorization: `Token ${window.localStorage.getItem('token')}` },
    params: { imdbId, tmdbId },
  });

  return {
    type: FETCH_ACTOR_SUGGESTIONS,
    payload: request,
  };
}

export const fetchAdditionalMovieInfo = id => (dispatch) => {
  axios.get(`${TMDB_MOVIE_URL}movie/imdb/${id}`, {
    headers: { Authorization: `Token ${window.localStorage.getItem('token')}` },
  }).then((response) => {
    dispatch({
      type: FETCH_TMDB_DETAILS,
      payload: response,
    });
    dispatch(fetchActorSuggestions(id, response.data.tmdbId));
  });
};

export const setImdbId = id => (dispatch) => {
  dispatch({
    type: SET_MOVIE_ID,
    payload: id,
  });
  if (id !== -1) {
    dispatch(fetchAdditionalMovieInfo(id));
  }
};
