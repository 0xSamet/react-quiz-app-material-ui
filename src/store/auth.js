import axios from "axios";

const INITIAL_STATE = {
  loginError: "",
  isFetching: false,
  isAuthenticated: false,
  token: "",
  user: {},
};

const LOGIN_START = "LOGIN_START";
const LOGIN_FAILURE = "LOGIN_FAILURE";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const loginStart = () => ({
  type: LOGIN_START,
});

export const loginFailure = (message) => ({
  type: LOGIN_FAILURE,
  payload: {
    message,
  },
});

export const loginSuccess = (token, user) => ({
  type: LOGIN_SUCCESS,
  payload: {
    token,
    user,
  },
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const login = (user) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const result = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
      user
    );
    if (result.status === 202) {
      if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
      }
      localStorage.setItem("token", result.data.token);
      dispatch(loginSuccess(result.data.token, result.data.user));
      return;
    }
    throw new Error(result.data.message);
  } catch (err) {
    dispatch(loginFailure(err.message));
  }
};

export const logout = () => (dispatch) => {
  dispatch(logoutSuccess());
  if (localStorage.getItem("token")) {
    localStorage.removeItem("token");
  }
};

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_START:
      return { ...state, isFetching: true, isAuthenticated: false, user: {} };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        loginError: action.payload.message,
        user: {},
      };
    case LOGOUT_SUCCESS:
      return { ...state, isAuthenticated: false, token: "", user: {} };
    default:
      return state;
  }
};
