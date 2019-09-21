import { combineReducers } from 'redux';
import filter from './filter';
import auth from './auth';

const reducers = combineReducers({
  filter,
  auth,
});

export default reducers;
