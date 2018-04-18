import { CREATE_REMAKE, FETCH_REMAKE } from '../actions'

export default function (state = {}, action) {
  switch (action.type) {
    case CREATE_REMAKE:
      return { ...state, [action.payload.title.title]: action.payload.title }
    default:
      return state
  }
}
