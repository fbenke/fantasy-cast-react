import _ from 'lodash'
import {
  SET_MOVIE_ID,
  RESET_MOVIE_SUGGESTIONS,
  FETCH_ACTOR_SUGGESTIONS,
  FETCH_ADDITIONAL_MOVIE_INFO
} from '../actions/movie'

import {
  CHARACTER_NOT_FOUND,
  CHARACTER_LOADING,
  CHARACTER_INIT
} from '../helpers/constants'

const emptyState = { imdbId: -1, tmdbId: -1, availableCharacters: [], characterState: CHARACTER_INIT, tmdbInfo: {} }

export default function (state = emptyState, action) {
  switch (action.type) {
    case SET_MOVIE_ID:
      return {
        ...state,
        imdbId: action.payload,
        availableCharacters: [],
        tmdbInfo: {},
        tmdbId: -1,
        characterState: action.payload !== -1 ? CHARACTER_LOADING : CHARACTER_INIT
      }
    case FETCH_ACTOR_SUGGESTIONS:
      return {...state,
        availableCharacters: action.payload.data,
        characterState: action.payload.data.length === 0 ? CHARACTER_NOT_FOUND : CHARACTER_INIT
      }
    case RESET_MOVIE_SUGGESTIONS:
      return emptyState
    case FETCH_ADDITIONAL_MOVIE_INFO:
      return { ...state,
        tmdbInfo: action.payload.data,
        tmdbId: action.payload.data.tmdbId || -1
      }
    default:
      return state
  }
}
