import { combineReducers } from 'redux';
import filter from './filter';
import favorite from './favorite';
import auth from './auth';

const reducers = combineReducers({
  filter,
  favorite,
  auth
});

export default reducers;
