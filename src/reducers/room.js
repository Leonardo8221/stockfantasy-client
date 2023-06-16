import {
  CREATE_ROOM_REQUEST,
  CREATE_ROOM_REQUEST_ERROR,
  CREATE_ROOM_REQUEST_SUCCESS,
  UPDATE_ROOM_REQUEST,
  UPDATE_ROOM_REQUEST_ERROR,
  UPDATE_ROOM_REQUEST_SUCCESS,
  DELETE_ROOM_REQUEST,
  DELETE_ROOM_REQUEST_ERROR,
  DELETE_ROOM_REQUEST_SUCCESS,
  GET_ROOM_REQUEST,
  GET_ROOM_REQUEST_ERROR,
  GET_ROOM_REQUEST_SUCCESS,
} from "../constants/roomConstant";

const initialState = {
  room: {},
  loading: false,
  error: null,
};

export const roomCreateReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ROOM_REQUEST:
      return { ...state, loading: true };
    case CREATE_ROOM_REQUEST_SUCCESS:
      return { ...state, loading: false, room: action.payload };
    case CREATE_ROOM_REQUEST_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
