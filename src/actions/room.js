/* eslint-disable no-restricted-globals */
import api from "../utils/api";
import { logout } from "./auth";
import { setAlert } from "./alert";
import {
  CREATE_ROOM_REQUEST,
  CREATE_ROOM_REQUEST_ERROR,
  CREATE_ROOM_REQUEST_SUCCESS,
  FORMAT_ROOM_REQUEST,
  JOIN_GAME_REQUEST,
  JOIN_GAME_REQUEST_ERROR,
  JOIN_GAME_REQUEST_SUCCESS,
  EXIT_GAME_REQUEST,
  EXIT_GAME_REQUEST_ERROR,
  EXIT_GAME_REQUEST_SUCCESS,
  END_GAME_REQUEST,
  END_GAME_REQUEST_ERROR,
  END_GAME_REQUEST_SUCCESS,
  GET_ROOM_REQUEST,
  GET_ROOM_REQUEST_ERROR,
  GET_ROOM_REQUEST_SUCCESS,
  GET_ROOMS_REQUEST,
  GET_ROOMS_REQUEST_ERROR,
  GET_ROOMS_REQUEST_SUCCESS,
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
  } catch (error) {}
};

export const endGame = (roomID, endDate) => async (dispatch) => {
  try {
    dispatch({ type: END_GAME_REQUEST });

    const { data } = await api.put(`/rooms/${roomID}`, { endDate });
    dispatch({ type: END_GAME_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch(setAlert(message, "error"));
    dispatch({ type: END_GAME_REQUEST_ERROR, payload: message });
  }
};

export const getRooms = (isStarted) => {
  return (dispatch) => {
    dispatch({ type: GET_ROOMS_REQUEST });

    api
      .get(`/rooms?isStarted=${isStarted}`)
      .then((response) => {
        const data = response.data;
        dispatch({ type: GET_ROOMS_REQUEST_SUCCESS, payload: data });
      })
      .catch((error) => {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === "Not authorized, token failed") {
          dispatch(logout());
        }
        dispatch(setAlert(message, "error"));
        dispatch({ type: GET_ROOMS_REQUEST_ERROR, payload: message });
      });
  };
};

export const getRoom = (roomID) => {
  return (dispatch) => {
    dispatch({ type: GET_ROOM_REQUEST });
    api
      .get(`/rooms/${roomID}`)
      .then((response) => {
        const data = response.data;

        dispatch({ type: GET_ROOM_REQUEST_SUCCESS, payload: data });
      })
      .catch((error) => {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === "Not authorized, token failed") {
          dispatch(logout());
        }
        dispatch(setAlert(message, "error"));
        dispatch({ type: GET_ROOM_REQUEST_ERROR, payload: message });
      });
  };
};

export const joinGame = (userID, roomID) => async (dispatch) => {
  try {
    dispatch({ type: JOIN_GAME_REQUEST });

    const { data } = await api.put(`/rooms/join-game/${roomID}`, { userID });
    
    localStorage.setItem("isJoined", true);
    dispatch({ type: JOIN_GAME_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch(setAlert(message, "error"));
    dispatch({ type: JOIN_GAME_REQUEST_ERROR, payload: message });
  }
};
export const exitGame = (userID, roomID) => async (dispatch) => {
  try {
    dispatch({ type: EXIT_GAME_REQUEST });

    const { data } = await api.put(`/rooms/exit-game/${roomID}`, { userID });
    dispatch({ type: EXIT_GAME_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch(setAlert(message, "error"));
    dispatch({ type: EXIT_GAME_REQUEST_ERROR, payload: message });
  }
};

export const getAllRooms = () => async (dispatch) => {};

export const deleteRoom = () => async (dispatch) => {};
