import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import RemakesReducer from './reducer_remakes'

const rootReducer = combineReducers({
  remakes: RemakesReducer,
  form: formReducer
})

export default rootReducer
