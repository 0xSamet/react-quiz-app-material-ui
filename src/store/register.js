import axios from "axios";

const INITIAL_STATE = {
  isFetching: false,
  registerError: "",
  registerSuccess: "",
};

export const registerStart = () => ({
  type: "REGISTER_START",
});

export const registerFailure = (message) => ({
  type: "REGISTER_FAILURE",
  payload: message,
});

export const registerSuccess = (message) => ({
  type: "REGISTER_SUCCESS",
  payload: message,
});

export const register = (user) => async (dispatch) => {
  try {
    dispatch(registerStart());
    const result = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/oturum/kayitol`,
      user
    );
    if (result.status === 201) {
      dispatch(registerSuccess("Kayıt Oldunuz"));
      return;
    }
    //throw new Error()
    dispatch(registerFailure(result.data.message));
  } catch (err) {
    console.log(err.response);
  }
};

export const registerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "REGISTER_START":
      return { ...state, isFetching: true };
    case "REGISTER_SUCCESS":
      return { ...state, isFetching: false, registerSuccess: action.payload };
    case "REGISTER_FAILURE":
      return { ...state, isFetching: false, registerError: action.payload };
    default:
      return state;
  }
};
