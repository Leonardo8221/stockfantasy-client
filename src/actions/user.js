import api from "../utils/api";
import { setAlert } from "./alert";
import { logout } from "./auth";

import {
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_REQUEST_SUCCESS,
  GET_ALL_USERS_REQUEST_ERROR,
  UPDATE_USER_REQUEST,
  UPDATE_USER_REQUEST_SUCCESS,
  UPDATE_USER_REQUEST_ERROR,
} from "../constants/userConstant";

export const getAllUers = () => {
  return (dispatch) => {
    dispatch({ type: GET_ALL_USERS_REQUEST });

    api
      .get("/users/all")
      .then((response) => {
        const data = response.data;
        dispatch({ type: GET_ALL_USERS_REQUEST_SUCCESS, payload: data });
      })
      .catch((error) => {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === "Not authorized, token failed") {
          dispatch(logout());
        }
        dispatch(setAlert(message, "error"));
        dispatch({ type: GET_ALL_USERS_REQUEST_ERROR, payload: message });
      });
  };
};
export const updateUser = (user) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });
    const res = await api.put(`/users/${user._id}`, user);
    dispatch({ type: UPDATE_USER_REQUEST_SUCCESS, payload: res.data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch(setAlert(message, "error"));
    dispatch({ type: UPDATE_USER_REQUEST_ERROR, payload: message });
  }
};
