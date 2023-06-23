import { SET_SOCKET, REMOVE_SOCKET } from "../constants/socketConstant";

export const setSocket = (socket) => (dispatch) => {
  dispatch({
    type: SET_SOCKET,
    socket,
  });
};
export const removeSocket = () => (dispatch) => {
  dispatch({
    type: REMOVE_SOCKET,
  });
};
