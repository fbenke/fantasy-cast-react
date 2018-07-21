import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  AUTH_DETAIL
} from '../actions/types'

const INITIAL_STATE = {
  errors: {},
  user: {},
  authenticated: false
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, errors: {}, authenticated: true }
    case UNAUTH_USER:
      return INITIAL_STATE
    case AUTH_ERROR:
      return { ...state, errors: action.payload }
    case AUTH_DETAIL:
      return { ...state, user: action.payload.data }
  }
  return state
}
