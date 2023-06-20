import {
  GIVE_SCORE_REQUEST,
  GIVE_SCORE_REQUEST_ERROR,
  GIVE_SCORE_REQUEST_SUCCESS,
  GET_SCORES_REQUEST,
  GET_SCORES_REQUEST_ERROR,
  GET_SCORES_REQUEST_SUCCESS,
} from "../constants/scoreConstant";

const initialState = {
  scores: [],
  loading: false,
  error: null,
};

export const scoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case GIVE_SCORE_REQUEST:
      return { ...state, loading: true };
    case GIVE_SCORE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        scores: [...state.scores, action.payload],
      };
    case GIVE_SCORE_REQUEST_ERROR:
      return { ...state, loading: false, error: action.payload };

    case GET_SCORES_REQUEST:
      return { ...state, loading: true };
    case GET_SCORES_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        scores: action.payload,
      };
    case GET_SCORES_REQUEST_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
