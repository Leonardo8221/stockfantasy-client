/* eslint-disable no-restricted-globals */
import api from "../utils/api";
import { logout } from "./auth";
import { setAlert } from "./alert";
import {
  GIVE_SCORE_REQUEST,
  GIVE_SCORE_REQUEST_ERROR,
  GIVE_SCORE_REQUEST_SUCCESS,
  GET_SCORES_REQUEST,
  GET_SCORES_REQUEST_ERROR,
  GET_SCORES_REQUEST_SUCCESS,
} from "../constants/scoreConstant";

export const giveScoreToUser = (formData) => async (dispatch) => {
  try {
    dispatch({ type: GIVE_SCORE_REQUEST });

    const { data } = await api.post("/scores", formData);

    dispatch({ type: GIVE_SCORE_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch(setAlert(message, "error"));
    dispatch({ type: GET_SCORES_REQUEST_ERROR, payload: message });
  }
};

export const getScores = (roomID) => {
  return (dispatch) => {
    dispatch({ type: GET_SCORES_REQUEST });
    api
      .get(`/scores=roomID=${roomID}`)
      .then((response) => {
        const { data } = response;

        dispatch({ type: GET_SCORES_REQUEST_SUCCESS, payload: data });
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
        dispatch({ type: GIVE_SCORE_REQUEST_ERROR, payload: message });
      });
  };
};
