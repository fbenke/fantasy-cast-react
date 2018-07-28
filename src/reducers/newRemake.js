import {
  SET_MOVIE_ID,
  RESET_MOVIE_SUGGESTIONS,
  FETCH_ACTOR_SUGGESTIONS,
} from '../actions/types';

import {
  CHARACTER_NOT_FOUND,
  CHARACTER_LOADING,
  CHARACTER_INIT,
} from '../helpers/constants';

const INITIAL_STATE = {
  imdbId: -1,
  availableCharacters: [],
  characterState: CHARACTER_INIT,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_MOVIE_ID:
      return {
        ...state,
        imdbId: action.payload,
        availableCharacters: [],
        characterState: action.payload !== -1 ? CHARACTER_LOADING : CHARACTER_INIT,
      };
    case FETCH_ACTOR_SUGGESTIONS:
      return {
        ...state,
        availableCharacters: action.payload.data,
        characterState: action.payload.data.length === 0 ? CHARACTER_NOT_FOUND : CHARACTER_INIT,
      };
    case RESET_MOVIE_SUGGESTIONS:
      return INITIAL_STATE;
    default:
      return state;
  }
}
