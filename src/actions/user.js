import api from "../utils/api";
import { setAlert } from "./alert";
import { logout } from "./auth";

import {
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_REQUEST_SUCCESS,
  GET_ALL_USERS_REQUEST_ERROR,
} from "../constants/userConstant";

export const getAllUers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_USERS_REQUEST });

    const { data } = await api.get("/users/all");

    dispatch({ type: GET_ALL_USERS_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch(setAlert(message, "error"));
    dispatch({ type: GET_ALL_USERS_REQUEST_ERROR, payload: message });
  }
};
