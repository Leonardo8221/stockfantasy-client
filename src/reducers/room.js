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

const initialState = {
  rooms: [],
  isRoomCreated: false,
  loading: false,
  error: null,
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
    case GET_ROOM_REQUEST:
      return { ...state, loading: true };
    case GET_ROOM_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        rooms: [...state.rooms, action.payload],
      };
    case GET_ROOM_REQUEST_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
