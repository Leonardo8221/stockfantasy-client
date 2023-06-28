/* eslint-disable no-restricted-globals */
import api from "../utils/api";
import { logout } from "./auth";
import { setAlert } from "./alert";
import {
  CREATE_GAME_REQUEST,
  CREATE_GAME_REQUEST_ERROR,
  CREATE_GAME_REQUEST_SUCCESS,
  FORMAT_GAME_REQUEST,
  GET_GAME_REQUEST,
  GET_GAME_REQUEST_ERROR,
  GET_GAME_REQUEST_SUCCESS,
  GET_GAMES_REQUEST,
  GET_GAMES_REQUEST_ERROR,
  GET_GAMES_REQUEST_SUCCESS,
  START_GAME_REQUEST,
  START_GAME_REQUEST_ERROR,
} from "../constants/gameConstant";
import { gameReadyListener } from "../utils/socket";

export const createGame = (formData, socket) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_GAME_REQUEST });
    socket.emit("gameReadyRequest", formData);
    const game = await gameReadyListener(socket, dispatch);

    dispatch({ type: CREATE_GAME_REQUEST_SUCCESS, payload: game });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch(setAlert(message, "error"));
    dispatch({ type: CREATE_GAME_REQUEST_ERROR, payload: message });
  }
};

export const formatGame = () => async (dispatch) => {
  try {
    dispatch({ type: FORMAT_GAME_REQUEST });
  } catch (error) {}
};

export const getGamesByRoomID = (roomID) => {
  return (dispatch) => {
    dispatch({ type: GET_GAMES_REQUEST });

    api
      .get(`/games?roomID=${roomID}`)
      .then((response) => {
        const { data } = response;
        dispatch({ type: GET_GAMES_REQUEST_SUCCESS, payload: data });
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
        dispatch({ type: GET_GAMES_REQUEST_ERROR, payload: message });
      });
  };
};

export const getGame = (id) => {
  return (dispatch) => {
    dispatch({ type: GET_GAME_REQUEST });
    api
      .get(`/games/${id}`)
      .then((response) => {
        const { data } = response;
        dispatch({ type: GET_GAME_REQUEST_SUCCESS, payload: data });
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
        dispatch({ type: GET_GAME_REQUEST_ERROR, payload: message });
      });
  };
};

export const startGame = (roomID) => async (dispatch) => {
  try {
    const { data } = await api.put(`/rooms/${roomID}`, {
      startedDate: new Date(),
    });
    dispatch({ type: START_GAME_REQUEST, payload: data });
    console.log("started game")
    localStorage.setItem('isJoined', false)
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch(setAlert(message, "error"));
    dispatch({ type: START_GAME_REQUEST_ERROR, payload: message });
  }
};

export const deleteGame = () => async (dispatch) => {};
