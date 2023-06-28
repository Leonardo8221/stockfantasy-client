import { v4 as uuidv4 } from "uuid";

import {
  CREATE_GAME_REQUEST,
  CREATE_GAME_REQUEST_ERROR,
  CREATE_GAME_REQUEST_SUCCESS,
  GET_GAME_REQUEST,
  GET_GAME_REQUEST_ERROR,
  GET_GAME_REQUEST_SUCCESS,
  GET_GAMES_REQUEST,
  GET_GAMES_REQUEST_ERROR,
  GET_GAMES_REQUEST_SUCCESS,
  GET_ALL_STOCKS_DATA_REQUEST,
  GET_ALL_STOCKS_DATA_REQUEST_SUCCESS,
  GET_ALL_STOCKS_DATA_REQUEST_ERROR,
} from "../constants/gameConstant";

const initialState = {
  games: [],
  stocks: [],
  loading: false,
  error: null,
};

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_GAME_REQUEST:
      return { ...state, loading: true };
    case CREATE_GAME_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        games: [...state.games, action.payload],
      };
    case CREATE_GAME_REQUEST_ERROR:
      return { ...state, loading: false, error: action.payload };
    case GET_GAMES_REQUEST:
      return { ...state, loading: true };
    case GET_GAMES_REQUEST_SUCCESS:
      return { ...state, loading: false, games: action.payload };
    case GET_GAMES_REQUEST_ERROR:
      return { ...state, loading: false, error: action.payload };
    case GET_GAME_REQUEST:
      return { ...state, loading: true };
    case GET_GAME_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        games: [...state.games, action.payload],
      };
    case GET_GAME_REQUEST_ERROR:
      return { ...state, loading: false, error: action.payload };

    case GET_ALL_STOCKS_DATA_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_STOCKS_DATA_REQUEST_SUCCESS:
      return { ...state, loading: false, stocks: action.payload };
    case GET_ALL_STOCKS_DATA_REQUEST_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
