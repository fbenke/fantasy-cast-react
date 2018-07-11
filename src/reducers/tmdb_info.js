import {
  SET_MOVIE_ID,
  RESET_MOVIE_SUGGESTIONS
} from '../actions/movie'

import {
  RESET_TMDB_DETAILS,
  FETCH_TMDB_DETAILS
} from '../actions/tmdb'

export default function (state = {}, action) {
  switch (action.type) {
    case SET_MOVIE_ID:
      return {}
    case RESET_MOVIE_SUGGESTIONS:
      return {}
    case RESET_TMDB_DETAILS:
      return {}
    case FETCH_TMDB_DETAILS:
      return action.payload.data
    default:
      return state
  }
}
