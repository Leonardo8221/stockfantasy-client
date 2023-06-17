import {
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_REQUEST_SUCCESS,
  GET_ALL_USERS_REQUEST_ERROR,
} from "../constants/userConstant";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_USERS_REQUEST_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case GET_ALL_USERS_REQUEST_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
