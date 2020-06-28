import axios from "axios";
import jwt from "jsonwebtoken";

const INITIAL_STATE = {
  loginError: "",
  isFetching: false,
  isAuthenticated: false,
  token: "",
  user: {},
};

export const loginStart = () => ({
  type: "LOGIN_START",
});

export const loginFailure = (message) => ({
  type: "LOGIN_FAILURE",
  payload: {
    message,
  },
});

export const loginSuccess = (token, user) => ({
  type: "LOGIN_SUCCESS",
  payload: {
    token,
    user,
  },
});

export const login = (user) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const result = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/oturum/girisyap`,
      user
    );
    if (result.status === 202) {
      jwt.verify(
        result.data.token,
        process.env.REACT_APP_JWT_SECRET,
        (err, user) => {
          if (err) {
            dispatch(loginFailure(err.message));
          }
          if (localStorage.getItem("token")) {
            localStorage.removeItem("token");
          }
          localStorage.setItem("token", result.data.token);
          dispatch(loginSuccess(result.data.token, user));
        }
      );

      return;
    }
    throw new Error(result.data.message);
  } catch (err) {
    dispatch(loginFailure(err.message));
  }
};

export const logout = () => ({
  type: "LOGOUT_SUCCESS",
});

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, isFetching: true, isAuthenticated: false, user: {} };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        loginError: action.payload.message,
        user: {},
      };
    case "LOGOUT_SUCCESS":
      return { ...state, isAuthenticated: false, token: "", user: {} };
    default:
      return state;
  }
};
