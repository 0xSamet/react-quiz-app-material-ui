import axios from "axios";

const INITIAL_STATE = {
  isFetching: false,
  registerError: "",
  registerSuccess: "",
};

const REGISTER_START = "REGISTER_START";
const REGISTER_FAILURE = "REGISTER_FAILURE";
const REGISTER_SUCCESS = "REGISTER_SUCCESS";

export const registerStart = () => ({
  type: REGISTER_START,
});

export const registerFailure = (message) => ({
  type: REGISTER_FAILURE,
  payload: message,
});

export const registerSuccess = (message) => ({
  type: REGISTER_SUCCESS,
  payload: message,
});

export const register = (user) => async (dispatch) => {
  try {
    dispatch(registerStart());
    const result = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/auth/register`,
      user
    );
    if (result.status === 201) {
      dispatch(registerSuccess("You have registered successfully"));
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
    case REGISTER_START:
      return { ...state, isFetching: true };
    case REGISTER_SUCCESS:
      return { ...state, isFetching: false, registerSuccess: action.payload };
    case REGISTER_FAILURE:
      return { ...state, isFetching: false, registerError: action.payload };
    default:
      return state;
  }
};
