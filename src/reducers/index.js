import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import {roomReducer} from './room';
import { userReducer } from './user';

export default combineReducers({
  alert,
  auth,
  roomReducer,
  userReducer
});
