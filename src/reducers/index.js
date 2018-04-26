import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import RemakesReducer from './remakes'
import AuthenticationReducer from './authentication'

const rootReducer = combineReducers({
  remakes: RemakesReducer,
  form: formReducer,
  authenticated: AuthenticationReducer
})

export default rootReducer
