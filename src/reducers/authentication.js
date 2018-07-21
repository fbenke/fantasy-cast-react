import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  AUTH_DETAIL
} from '../actions/auth'

const INITIAL_STATE = {
  error: {},
  user: {},
  authenticated: false
}

export default function (state = INITIAL_STATE, action) {
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
