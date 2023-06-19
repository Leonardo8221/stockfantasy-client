import { v4 as uuidv4 } from 'uuid';

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
  
  const initialState = {
    games: [],
    isGameStarted: false,
    stocks: [
      { id: uuidv4(), ticker: "AAPL", price: 184.94, date: "2023-06-19" },
      { id: uuidv4(), ticker: "MSFT", price: 342.97, date: "2023-06-19" },
      { id: uuidv4(), ticker: "AMZN", price: 125.58, date: "2023-06-19" },
      { id: uuidv4(), ticker: "NVDA", price: 427.75, date: "2023-06-19" },
      { id: uuidv4(), ticker: "GOOGL", price: 123.71, date: "2023-06-19" },
      { id: uuidv4(), ticker: "TSLA", price: 261.48, date: "2023-06-19" },
      { id: uuidv4(), ticker: "GOOG", price: 124.19, date: "2023-06-19" },
      { id: uuidv4(), ticker: "META", price: 281.02, date: "2023-06-19" },
      { id: uuidv4(), ticker: "BRK.B", price: 338.41, date: "2023-06-19" },
      { id: uuidv4(), ticker: "XOM", price: 105.1, date: "2023-06-19" },
      { id: uuidv4(), ticker: "UNH", price: 457.75, date: "2023-06-19" },
      { id: uuidv4(), ticker: "JNJ", price: 164.3, date: "2023-06-19" },
      { id: uuidv4(), ticker: "JPM", price: 143.03, date: "2023-06-19" },
      { id: uuidv4(), ticker: "AVGO", price: 870.26, date: "2023-06-19" },
      { id: uuidv4(), ticker: "V", price: 228.9, date: "2023-06-19" },
      { id: uuidv4(), ticker: "LLY", price: 449.12, date: "2023-06-19" },
      { id: uuidv4(), ticker: "PG", price: 149.55, date: "2023-06-19" },
      { id: uuidv4(), ticker: "MA", price: 376.5, date: "2023-06-19" },
      { id: uuidv4(), ticker: "HD", price: 300.37, date: "2023-06-19" },
      { id: uuidv4(), ticker: "CVX", price: 157.25, date: "2023-06-19" },
      { id: uuidv4(), ticker: "MRK", price: 109.61, date: "2023-06-19" },
      { id: uuidv4(), ticker: "PEP", price: 186.16, date: "2023-06-19" },
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
          isGameStarted: true,
        };
      case CREATE_GAME_REQUEST_ERROR:
        return { ...state, loading: false, error: action.payload };
      case FORMAT_GAME_REQUEST:
        return { ...state, isGameStarted: false };
  
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
  