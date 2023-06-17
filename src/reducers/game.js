import {
    CREATE_GAMES_REQUEST,
    CREATE_GAMES_REQUEST_ERROR,
    CREATE_GAMES_REQUEST_SUCCESS,
    FORMAT_GAMES_REQUEST,
    UPDATE_GAMES_REQUEST,
    UPDATE_GAMES_REQUEST_ERROR,
    UPDATE_GAMES_REQUEST_SUCCESS,
    DELETE_GAMES_REQUEST,
    DELETE_GAMES_REQUEST_ERROR,
    DELETE_GAMES_REQUEST_SUCCESS,
    GET_GAMES_REQUEST,
    GET_GAMES_REQUEST_ERROR,
    GET_GAMES_REQUEST_SUCCESS,
    GET_GAMESS_REQUEST,
    GET_GAMESS_REQUEST_ERROR,
    GET_GAMESS_REQUEST_SUCCESS,
    GET_ALL_GAMESS_REQUEST,
    GET_ALL_GAMESS_REQUEST_ERROR,
    GET_ALL_GAMESS_REQUEST_SUCCESS,
  } from "../constants/gameConstant";
  
  const initialState = {
    games: [],
    isGameStarted: false,
    loading: false,
    error: null,
  };
  
  export const gameReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_GAMES_REQUEST:
        return { ...state, loading: true };
      case CREATE_GAMES_REQUEST_SUCCESS:
        return {
          ...state,
          loading: false,
          games: [...state.games, action.payload],
          isGameStarted: true,
        };
      case CREATE_GAMES_REQUEST_ERROR:
        return { ...state, loading: false, error: action.payload };
      case FORMAT_GAMES_REQUEST:
        return { ...state, isGameStarted: false };
  
      case GET_GAMESS_REQUEST:
        return { ...state, loading: true };
      case GET_GAMESS_REQUEST_SUCCESS:
        return { ...state, loading: false, games: action.payload };
      case GET_GAMESS_REQUEST_ERROR:
        return { ...state, loading: false, error: action.payload };
      case GET_GAMES_REQUEST:
        return { ...state, loading: true };
      case GET_GAMES_REQUEST_SUCCESS:
        return {
          ...state,
          loading: false,
          games: [...state.games, action.payload],
        };
      case GET_GAMES_REQUEST_ERROR:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  