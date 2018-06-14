import _ from 'lodash'
import { FETCH_MOVIE_SUGGESTIONS, RESET_MOVIE_SUGGESTIONS } from '../actions/movie'

const MOVIE_URL = `${process.env.API_URL}api/imdb/`

export default function (state = { suggestions: [], error: false }, action) {
  switch (action.type) {
    case FETCH_MOVIE_SUGGESTIONS:

      const suggestions = _.map(
        action.payload.data, i => (
          { id: i.id,
            name: i.primaryTitle,
            year: i.startYear,
            type: i.titleType
          }
        )
      )
      if (suggestions.length === 0) {
        return { error: true, suggestions: suggestions }
      }
      return { error: false, suggestions: suggestions }
    case RESET_MOVIE_SUGGESTIONS:
      return { suggestions: [], error: false }
    default:
      return state
  }
}
