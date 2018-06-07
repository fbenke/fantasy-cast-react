import { SET_MOVIE_ID } from '../actions/movie'

export default function (state = { movieId: -1 }, action) {
  switch (action.type) {
    case SET_MOVIE_ID:
      return { ...state, movieId: action.payload }
    default:
      return state
  }
}
