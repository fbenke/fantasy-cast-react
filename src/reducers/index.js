import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import AuthenticationReducer from './authentication'
import RemakesReducer from './remakes'
import NewRemakeReducer from './new_remake'
import MovieReducer from './movie_suggestions'
import TmdbInfoReducer from './tmdb_info'

const rootReducer = combineReducers({
  form: formReducer,
  auth: AuthenticationReducer,
  remakes: RemakesReducer,
  newRemake: NewRemakeReducer,
  movieSuggestions: MovieReducer,
  tmdbInfo: TmdbInfoReducer
})

export default rootReducer
