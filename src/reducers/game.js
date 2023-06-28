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
} from "../constants/gameConstant";

const initialState = {
  games: [],
  stocks: [
    { id: uuidv4(), symbol: "AAPL", price: 184.94, date: "2023-06-19" },
    { id: uuidv4(), symbol: "MSFT", price: 342.97, date: "2023-06-19" },
    { id: uuidv4(), symbol: "AMZN", price: 125.58, date: "2023-06-19" },
    { id: uuidv4(), symbol: "NVDA", price: 427.75, date: "2023-06-19" },
    { id: uuidv4(), symbol: "GOOGL", price: 123.71, date: "2023-06-19" },
    { id: uuidv4(), symbol: "TSLA", price: 261.48, date: "2023-06-19" },
    { id: uuidv4(), symbol: "GOOG", price: 124.19, date: "2023-06-19" },
    { id: uuidv4(), symbol: "META", price: 281.02, date: "2023-06-19" },
    { id: uuidv4(), symbol: "BRK.B", price: 338.41, date: "2023-06-19" },
    { id: uuidv4(), symbol: "XOM", price: 105.1, date: "2023-06-19" },
    { id: uuidv4(), symbol: "UNH", price: 457.75, date: "2023-06-19" },
    { id: uuidv4(), symbol: "JNJ", price: 164.3, date: "2023-06-19" },
    { id: uuidv4(), symbol: "JPM", price: 143.03, date: "2023-06-19" },
    { id: uuidv4(), symbol: "AVGO", price: 870.26, date: "2023-06-19" },
    { id: uuidv4(), symbol: "V", price: 228.9, date: "2023-06-19" },
    { id: uuidv4(), symbol: "LLY", price: 449.12, date: "2023-06-19" },
    { id: uuidv4(), symbol: "PG", price: 149.55, date: "2023-06-19" },
    { id: uuidv4(), symbol: "MA", price: 376.5, date: "2023-06-19" },
    { id: uuidv4(), symbol: "HD", price: 300.37, date: "2023-06-19" },
    { id: uuidv4(), symbol: "CVX", price: 157.25, date: "2023-06-19" },
    { id: uuidv4(), symbol: "MRK", price: 109.61, date: "2023-06-19" },
    { id: uuidv4(), symbol: "PEP", price: 186.16, date: "2023-06-19" },
  ],
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

    default:
      return state;
  }
};
