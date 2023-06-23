import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import socket from './socket';
import {roomReducer} from './room';
import { userReducer } from './user';
import { gameReducer } from './game';
import { scoreReducer } from './score';

export default combineReducers({
  alert,
  auth,
  roomReducer,
  userReducer,
  gameReducer,
  scoreReducer,
  socket
});
