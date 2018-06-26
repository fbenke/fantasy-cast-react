import {
  SET_MOVIE_ID,
  RESET_MOVIE_SUGGESTIONS,
  FETCH_ADDITIONAL_MOVIE_INFO
} from '../actions/movie'

import { RESET_TMDB_DETAILS } from '../actions/remake'

export default function (state = {}, action) {
  switch (action.type) {
    case SET_MOVIE_ID:
      return {}
    case RESET_MOVIE_SUGGESTIONS:
      return {}
    case RESET_TMDB_DETAILS:
      return {}
    case FETCH_ADDITIONAL_MOVIE_INFO:
      return action.payload.data
    default:
      return state
  }
}
