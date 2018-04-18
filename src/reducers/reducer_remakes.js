import _ from 'lodash'
import { CREATE_REMAKE, FETCH_REMAKES } from '../actions'

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_REMAKES:
      return _.mapKeys(action.payload.data, 'id')
    case CREATE_REMAKE:
      return { ...state, [action.payload.title.title]: action.payload.title }
    default:
      return state
  }
}
