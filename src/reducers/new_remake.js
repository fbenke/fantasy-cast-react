import _ from 'lodash'
import {
  SET_MOVIE_ID,
  RESET_MOVIE_SUGGESTIONS,
  FETCH_ACTOR_SUGGESTIONS,
  FETCH_ADDITIONAL_MOVIE_INFO,
  DELETE_ACTOR
} from '../actions/movie'

const emptyState = { movieId: -1, actors: {}, characters: [], additionalInfo: {} }

export default function (state = emptyState, action) {
  switch (action.type) {
    case SET_MOVIE_ID:
      return { ...state, movieId: action.payload, actors: {}, additionalInfo: {} }
    case FETCH_ACTOR_SUGGESTIONS:
      return {
        ...state,
        actors: _.mapKeys(action.payload.data, 'id'),
        characters: _.map(action.payload.data, i => i.characters) }
    case RESET_MOVIE_SUGGESTIONS:
      return emptyState
    case FETCH_ADDITIONAL_MOVIE_INFO:
      return {
        ...state, additionalInfo: action.payload.data
      }
    case DELETE_ACTOR:
      return {
        ...state,
        actors: _.omit(state.actors, action.payload.id),
        characters: _.remove(state.characters, c => c !== action.payload.characters)

      }
    default:
      return state
  }
}
