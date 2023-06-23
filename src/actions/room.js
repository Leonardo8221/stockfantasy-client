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
import { addedRoomListener } from "../utils/socket";

export const createRoom = (formData, socket) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ROOM_REQUEST });
    console.log("actions for creating", socket)
    // const { data } = await api.post("/rooms", formData);
    socket.emit("addRoom", formData);
    const  room = await addedRoomListener(socket, dispatch);
    dispatch({ type: CREATE_ROOM_REQUEST_SUCCESS, payload: room });
    dispatch(setAlert(`"${room.name}" room was created successfully!`, "success"));
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

export const joinGame = (userID, roomID) => async (dispatch, getState) => {
  try {
    dispatch({ type: JOIN_GAME_REQUEST });

    const { data } = await api.put(`/rooms/join-game/${roomID}`, { userID });

    localStorage.setItem("isJoined", !getState().roomReducer.isJoined);
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
