import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import {roomCreateReducer} from './room';

export default combineReducers({
  alert,
  auth,
  roomCreateReducer,
});
