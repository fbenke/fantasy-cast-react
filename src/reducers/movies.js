import _ from 'lodash'
import { FETCH_MOVIE_SUGGESTIONS } from '../actions/types'

export default function (state = {suggestions: [], notFound: false}, action) {
  switch (action.type) {
    case FETCH_MOVIE_SUGGESTIONS:
      return action.payload
    default:
      return state
  }
}
