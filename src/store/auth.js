import axios from "axios";

const INITIAL_STATE = {
  loginError: "",
  isFetching: false,
  isAuthenticated: false,
  token: "",
};

const loginStart = () => ({
  type: "LOGIN_START",
});

export const loginFailure = (message) => ({
  type: "LOGIN_FAILURE",
  payload: {
    message: message,
  },
});

export const loginSuccess = (token) => ({
  type: "LOGIN_SUCCESS",
  payload: {
    token: token,
  },
});

export const login = (user) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const result = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/oturum/girisyap`,
      user
    );
    console.log(result);
    if (result.status === 202) {
      dispatch(loginSuccess(result.data.token));
      return;
    }
    dispatch(loginFailure(result.data.message));
  } catch (err) {
    console.log(err.response);
  }
};

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, isFetching: true, isAuthenticated: false };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        token: action.payload.token,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        loginError: action.payload.message,
      };
    case "LOGOUT_SUCCESS":
      return { ...state, isAuthenticated: false, token: "" };
    default:
      return state;
  }
};
