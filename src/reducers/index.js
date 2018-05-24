import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import AuthenticationReducer from './authentication'
import RemakesReducer from './remakes'
import MovieReducer from './movies'

const rootReducer = combineReducers({
  remakes: RemakesReducer,
  form: formReducer,
  auth: AuthenticationReducer,
  movies: MovieReducer
})

export default rootReducer
