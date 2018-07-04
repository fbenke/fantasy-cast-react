import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  AUTH_DETAIL
} from '../actions/auth'

export default function (state = {error: {}, user: {}, authenticated: false}, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, error: {}, authenticated: true }
    case UNAUTH_USER:
      return { ...state, authenticated: false, user: {} }
    case AUTH_ERROR:
      return { ...state, error: action.payload }
    case AUTH_DETAIL:
      return { ...state, user: action.payload.data }
  }
  return state
}
