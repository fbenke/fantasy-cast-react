import { SET_MOVIE_ID, FETCH_MOVIE_ACTOR_SUGGESTIONS } from '../actions/movie'

export default function (state = { movieId: -1, actor_suggestions: [] }, action) {
  switch (action.type) {
    case SET_MOVIE_ID:
      return { ...state, movieId: action.payload, actor_suggestions: [] }
    case FETCH_MOVIE_ACTOR_SUGGESTIONS:
      return { ...state, actor_suggestions: action.payload.data }
    default:
      return state
  }
}
