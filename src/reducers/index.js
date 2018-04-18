import { combineReducers } from 'redux';
import RemakesReducer from './reducer_remakes';

const rootReducer = combineReducers({
	remakes: RemakesReducer
});

export default rootReducer;
