import {
  CREATE_ROOM_REQUEST,
  CREATE_ROOM_REQUEST_ERROR,
  CREATE_ROOM_REQUEST_SUCCESS,
  FORMAT_ROOM_REQUEST,
  GET_ROOM_REQUEST,
  GET_ROOM_REQUEST_ERROR,
  GET_ROOM_REQUEST_SUCCESS,
  GET_ROOMS_REQUEST,
  GET_ROOMS_REQUEST_ERROR,
  GET_ROOMS_REQUEST_SUCCESS,
  JOIN_GAME_REQUEST,
  JOIN_GAME_REQUEST_ERROR,
  JOIN_GAME_REQUEST_SUCCESS,
  
  EXIT_GAME_REQUEST,
  EXIT_GAME_REQUEST_ERROR,
  EXIT_GAME_REQUEST_SUCCESS,

} from "../constants/roomConstant";

import { LOGOUT } from "../constants/userConstant";

const initialState = {
  rooms: [],
  isRoomCreated: false,
  loading: false,
  error: null,
  isJoined: localStorage.getItem("isJoined"),
};

export const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ROOM_REQUEST:
      return { ...state, loading: true };
    case CREATE_ROOM_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        rooms: [...state.rooms, action.payload],
        isRoomCreated: true,
      };
    case CREATE_ROOM_REQUEST_ERROR:
      return { ...state, loading: false, error: action.payload };
    case FORMAT_ROOM_REQUEST:
      return { ...state, isRoomCreated: false };
    case GET_ROOMS_REQUEST:
      return { ...state, loading: true };
    case GET_ROOMS_REQUEST_SUCCESS:
      return { ...state, loading: false, rooms: action.payload };
    case GET_ROOMS_REQUEST_ERROR:
      return { ...state, loading: false, error: action.payload };
    case JOIN_GAME_REQUEST:
      return { ...state, loading: true };
    case JOIN_GAME_REQUEST_SUCCESS:
      // localStorage.setItem('isJoined', true);
      return { ...state, loading: false, isJoined: true, rooms: action.payload };
    case JOIN_GAME_REQUEST_ERROR:
      // localStorage.setItem('isJoined', false);
      return { ...state, loading: false, error: action.payload };
    case EXIT_GAME_REQUEST:
      return { ...state, loading: true };
    case EXIT_GAME_REQUEST_SUCCESS:
      return { ...state, loading: false, isJoined: false };
    case EXIT_GAME_REQUEST_ERROR:
      return { ...state, loading: false, error: action.payload };
    case GET_ROOM_REQUEST:
      return { ...state, loading: true };
    case GET_ROOM_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        rooms: action.payload,
      };
    case GET_ROOM_REQUEST_ERROR:
      return { ...state, loading: false, error: action.payload };
case LOGOUT:
  return {
    ...state, isJoined: false
  }
    default:
      return state;
  }
};
