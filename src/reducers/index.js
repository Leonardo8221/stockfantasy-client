import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import {roomCreateReducer} from './room';
import { getAllUsersReducer } from './user';

export default combineReducers({
  alert,
  auth,
  roomCreateReducer,
  getAllUsersReducer
});
