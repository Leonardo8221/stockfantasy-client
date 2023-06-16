/* eslint-disable no-restricted-globals */
import api from "../utils/api";
import { logout } from "./auth";
import { setAlert } from "./alert";
import {
  CREATE_ROOM_REQUEST,
  CREATE_ROOM_REQUEST_ERROR,
  CREATE_ROOM_REQUEST_SUCCESS,

  FORMAT_ROOM_REQUEST,

  UPDATE_ROOM_REQUEST,
  UPDATE_ROOM_REQUEST_ERROR,
  UPDATE_ROOM_REQUEST_SUCCESS,

  DELETE_ROOM_REQUEST,
  DELETE_ROOM_REQUEST_ERROR,
  DELETE_ROOM_REQUEST_SUCCESS,

  GET_ROOM_REQUEST,
  GET_ROOM_REQUEST_ERROR,
  GET_ROOM_REQUEST_SUCCESS,

  GET_ROOMS_REQUEST,
  GET_ROOMS_REQUEST_ERROR,
  GET_ROOMS_REQUEST_SUCCESS,

  GET_ALL_ROOMS_REQUEST,
  GET_ALL_ROOMS_REQUEST_ERROR,
  GET_ALL_ROOMS_REQUEST_SUCCESS,


} from "../constants/roomConstant";

export const createRoom = (formData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ROOM_REQUEST });

    const { data } = await api.post("/rooms", formData);

    dispatch({ type: CREATE_ROOM_REQUEST_SUCCESS, payload: data });
    dispatch(setAlert(`Created Room successfully-${data.name}`, "success"));
    
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch(setAlert(message, "error"));
    dispatch({ type: CREATE_ROOM_REQUEST_ERROR, payload: message });
  }
};

export const formatRoom = () => async (dispatch) => {
  try {
    dispatch({ type: FORMAT_ROOM_REQUEST });
  } catch (error) {
  }
};

export const getRooms = (params) => async (dispatch) => {
   try {
    dispatch({ type: GET_ROOMS_REQUEST });

    const { data } = await api.get("/rooms", params);

    dispatch({ type: GET_ROOMS_REQUEST_SUCCESS, payload: data });
    // dispatch(setAlert(`Created Room successfully-${data.name}`, "success"));
    
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch(setAlert(message, "error"));
    dispatch({ type: GET_ROOMS_REQUEST_ERROR, payload: message });
  }
};

export const getRoom = () => async (dispatch) => {};

export const getAllRooms = () => async (dispatch) => {};

export const deleteRoom = () => async (dispatch) => {};
