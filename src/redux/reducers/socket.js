import { SET_SOCKET, REMOVE_SOCKET } from '../constants/socketConstant';

const initialState = {};

function socketReducer(state = initialState, action) {
  const { type, socket } = action;

  switch (type) {
    case SET_SOCKET:
      return socket;
    case REMOVE_SOCKET:
      return {};
    default:
      return state;
  }
}

export default socketReducer;
