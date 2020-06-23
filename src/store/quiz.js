import axios from "axios";

const INITIAL_STATE = {
  isFetching: false,
  errorMessage: "",
  quizzes: [],
};

export const fetchStart = () => ({
  type: "FETCH_START",
});

export const fetchSuccess = (quizzes) => ({
  type: "FETCH_SUCCESS",
  payload: {
    quizzes,
  },
});

export const fetchFailure = () => ({
  type: "FETCH_FAILURE",
});

export const fetch = (query = "") => async (dispatch) => {
  dispatch(fetchStart());
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/testler`,
      {
        params: {
          q: query,
        },
      }
    );
    if (result.status === 200) {
      dispatch(fetchSuccess(result.data));
    }
    //console.log(result);
  } catch (err) {
    console.log(err);
  }
};

export const quizzesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, isFetching: true, quizzes: [] };
    case "FETCH_SUCCESS":
      return { ...state, isFetching: false, quizzes: action.payload.quizzes };
    case "FETCH_FAILURE":
      return {
        ...state,
        isFetching: false,
        quizzes: [],
        errorMessage: action.payload.errorMessage,
      };
    default:
      return state;
  }
};
