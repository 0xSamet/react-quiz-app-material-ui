import axios from "axios";
import { useHistory } from "react-router-dom";

const INITIAL_STATE = {
  isFetching: false,
  errorMessage: "",
  successMessage: "",
  quizzes: [],
};

const FETCH_START = "FETCH_START";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_FAILURE = "FETCH_FAILURE";
const CREATE_START = "CREATE_START";
const CREATE_SUCCESS = "CREATE_SUCCESS";
const CREATE_FAILURE = "CREATE_FAILURE";

export const fetchStart = () => ({
  type: FETCH_START,
});

export const fetchSuccess = (quizzes) => ({
  type: FETCH_SUCCESS,
  payload: {
    quizzes,
  },
});

export const fetchFailure = () => ({
  type: FETCH_FAILURE,
});

export const createStart = () => ({
  type: CREATE_START,
});

export const createSuccess = (message) => ({
  type: CREATE_SUCCESS,
  payload: {
    message,
  },
});

export const createFailure = (message) => ({
  type: CREATE_FAILURE,
  payload: {
    message,
  },
});

export const fetchQuizzes =
  (query = "") =>
  async (dispatch) => {
    dispatch(fetchStart());
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/quizzes`,
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

export const createQuiz = (quiz, history) => async (dispatch) => {
  dispatch(createStart());

  try {
    const result = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/quizzes`,
      quiz,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (result.data.message) {
      return dispatch(createFailure(result.data.message));
    }

    dispatch(createSuccess("The quiz has been created!"));
    history.push("/quizzes");
  } catch (err) {
    console.log(err);
  }
};

export const quizzesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_START:
      return { ...state, isFetching: true, quizzes: [] };
    case FETCH_SUCCESS:
      return { ...state, isFetching: false, quizzes: action.payload.quizzes };
    case FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        quizzes: [],
        errorMessage: action.payload.errorMessage,
      };
    case CREATE_START:
      return {
        ...state,
        isFetching: true,
      };
    case CREATE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        successMessage: action.payload.message,
      };
    case CREATE_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload.message,
      };
    default:
      return state;
  }
};
