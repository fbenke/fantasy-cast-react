import _ from 'lodash'
import { FETCH_MOVIE_SUGGESTIONS, RESET_MOVIE_SUGGESTIONS } from '../actions/movie'

const MOVIE_URL = `${process.env.API_URL}api/imdb/`

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_MOVIE_SUGGESTIONS:
      const suggestions = _.map(
        action.payload.data, i => (
          { id: i.id,
            name: i.primary_title,
            year: i.start_year,
            type: i.title_type
          }
        )
      )
      return suggestions
    case RESET_MOVIE_SUGGESTIONS:
      return []
    default:
      return state
  }
}
