import _ from 'lodash'

import {
  FETCH_MOVIE_SUGGESTIONS,
  RESET_MOVIE_SUGGESTIONS
} from '../actions/types'

const INITIAL_STATE = {
  suggestions: [],
  error: false
}

export default function (state = INITIAL_STATE, action) {
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
      return INITIAL_STATE
    default:
      return state
  }
}
