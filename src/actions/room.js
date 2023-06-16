import api from "../utils/api";
import { logout } from "./auth";
import { setAlert } from "./alert";
import {
  CREATE_ROOM_REQUEST,
  CREATE_ROOM_REQUEST_ERROR,
  CREATE_ROOM_REQUEST_SUCCESS,
  UPDATE_ROOM_REQUEST,
  UPDATE_ROOM_REQUEST_ERROR,
  UPDATE_ROOM_REQUEST_SUCCESS,
  DELETE_ROOM_REQUEST,
  DELETE_ROOM_REQUEST_ERROR,
  DELETE_ROOM_REQUEST_SUCCESS,
  GET_ROOM_REQUEST,
  GET_ROOM_REQUEST_ERROR,
  GET_ROOM_REQUEST_SUCCESS,
} from "../constants/roomConstant";

export const createRoom = (formData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ROOM_REQUEST });

    const {data} = await api.post("/rooms", formData);
   
    dispatch({ type: CREATE_ROOM_REQUEST_SUCCESS, payload: data });
    dispatch(setAlert(`Created Room successfully-${data.name}`, "success"));

    return true;

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch(setAlert(message, "error"));
    dispatch({ type: CREATE_ROOM_REQUEST_ERROR, payload: message });

    return false
  }
};
