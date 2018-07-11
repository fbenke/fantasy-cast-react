import _ from 'lodash'
import {
  FETCH_REMAKES,
  FETCH_REMAKE,
  FETCH_REMAKE_ERROR,
  DELETE_REMAKE
} from '../actions/remake'

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_REMAKES:
      const newPosts = _.mapKeys(action.payload.data, 'id')
      return newPosts
    case FETCH_REMAKE:
      return { ...state, [action.payload.data.id]: action.payload.data }
    case DELETE_REMAKE:
      return _.omit(state, action.payload)
    default:
      return state
  }
}
