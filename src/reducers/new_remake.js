import _ from 'lodash'
import {
  SET_MOVIE_ID,
  RESET_MOVIE_SUGGESTIONS,
  FETCH_ACTOR_SUGGESTIONS,
  DELETE_ACTOR
} from '../actions/movie'

export default function (state = { movieId: -1, actors: {} }, action) {
  switch (action.type) {
    case SET_MOVIE_ID:
      return { ...state, movieId: action.payload, actors: {} }
    case FETCH_ACTOR_SUGGESTIONS:
      return { ...state, actors: _.mapKeys(action.payload.data, 'id') }
    case RESET_MOVIE_SUGGESTIONS:
      return { movieId: -1, actors: {} }
    case DELETE_ACTOR:
      return { ...state, actors: _.omit(state.actors, action.payload) }
    default:
      return state
  }
}
