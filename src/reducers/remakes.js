import _ from 'lodash'
import {
  FETCH_REMAKES,
  FETCH_REMAKE,
  DELETE_REMAKE
} from '../actions/types'

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_REMAKES:
      const newPosts = _.mapKeys(action.payload.data, 'id')
      return { ...state, ...newPosts }
    case FETCH_REMAKE:
      return { ...state, [action.payload.data.id]: action.payload.data }
    case DELETE_REMAKE:
      return _.omit(state, action.payload)
    default:
      return state
  }
}
