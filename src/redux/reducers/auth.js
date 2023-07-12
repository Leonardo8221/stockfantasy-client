import {
  REGISTER_SUCCESS,
  //REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  //LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
  UPDATE_PASSWORD,
  UPDATE_USER_REQUEST,
  UPDATE_USER_REQUEST_ERROR,
  UPDATE_USER_REQUEST_SUCCESS,
} from "../constants/userConstant";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };

    case UPDATE_PASSWORD:
      return {
        ...state,
        ...payload,
        loading: false,
      };

    case ACCOUNT_DELETED:
    case AUTH_ERROR:
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };

    case UPDATE_USER_REQUEST:
      return { ...state, loading: true };
    case UPDATE_USER_REQUEST_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case UPDATE_USER_REQUEST_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}

export default authReducer;
