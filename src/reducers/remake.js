import {
  FETCH_REMAKE,
  FETCH_REMAKE_ERROR,
  RESET_REMAKE,
  CLOSE_REMAKE
} from '../actions/remake'

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_REMAKE:
      return action.payload.data
    case FETCH_REMAKE_ERROR:
      return { error: action.payload }
    case RESET_REMAKE:
      return {}
    case CLOSE_REMAKE:
      return {...state, isOpen: false}
    default:
      return state
  }
}
