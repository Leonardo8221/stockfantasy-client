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


} from "../constants/gameConstant";


export const createGame = (formData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_GAME_REQUEST });

    const { data } = await api.post("/games", formData);

    dispatch({ type: CREATE_GAME_REQUEST_SUCCESS, payload: data });

   
    dispatch(setAlert("Game started", "success"));
    
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
  } catch (error) {
  }
};

export const getGames = (roomID) => async (dispatch) => {
   try {
    dispatch({ type: GET_GAMES_REQUEST });

    const { data } = await api.get(`/games?roomID=${roomID}`);
    dispatch({ type: GET_GAMES_REQUEST_SUCCESS, payload: data });
    
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch(setAlert(message, "error"));
    dispatch({ type: GET_GAMES_REQUEST_ERROR, payload: message });
  }
};

export const getGame = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_GAME_REQUEST });

    const { data } = await api.get(`/games/${id}`);

    dispatch({ type: GET_GAME_REQUEST_SUCCESS, payload: data });
    
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch(setAlert(message, "error"));
    dispatch({ type: GET_GAME_REQUEST_ERROR, payload: message });
  }
};

export const getAllGames = () => async (dispatch) => {};

export const deleteGame = () => async (dispatch) => {};
