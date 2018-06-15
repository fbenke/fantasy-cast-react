import _ from 'lodash'
import {
  SET_MOVIE_ID,
  RESET_MOVIE_SUGGESTIONS,
  FETCH_ACTOR_SUGGESTIONS,
  FETCH_ADDITIONAL_MOVIE_INFO,
  DELETE_CHARACTER
} from '../actions/movie'

const emptyState = { imdbId: -1, tmdbId: -1, characters: {}, tmdbInfo: {} }

export default function (state = emptyState, action) {
  switch (action.type) {
    case SET_MOVIE_ID:
      return { ...state, imdbId: action.payload, characters: {}, tmdbInfo: {}, tmdbId: -1 }
    case FETCH_ACTOR_SUGGESTIONS:
      return {
        ...state,
        characters: _.mapKeys(action.payload.data, 'id')
      }
    case RESET_MOVIE_SUGGESTIONS:
      return emptyState
    case FETCH_ADDITIONAL_MOVIE_INFO:
      return {
        ...state, tmdbInfo: action.payload.data, tmdbId: action.payload.data.tmdbId || -1
      }
    case DELETE_CHARACTER:
      return {
        ...state,
        characters: _.omit(state.characters, action.payload)
      }
    default:
      return state
  }
}
