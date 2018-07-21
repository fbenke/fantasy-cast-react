import {
  SET_MOVIE_ID,
  RESET_MOVIE_SUGGESTIONS,
  FETCH_TMDB_DETAILS,
  RESET_REMAKE
} from '../actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case SET_MOVIE_ID:
      return {}
    case RESET_MOVIE_SUGGESTIONS:
      return {}
    case RESET_REMAKE:
      return {}
    case FETCH_TMDB_DETAILS:
      return action.payload.data
    default:
      return state
  }
}
