const INITIAL_STATE = {
  title: "",
  index: 0,
  mobileDrawer: false,
};

const CHANGE_MENU_INDEX = "CHANGE_MENU_INDEX";
const CHANGE_MENU_TITLE = "CHANGE_MENU_TITLE";
const TOGGLE_MOBILE_DRAWER = "TOGGLE_MOBILE_DRAWER";

export const changeMenuIndex = (index) => ({
  type: CHANGE_MENU_INDEX,
  payload: index,
});

export const changeTitle = (title) => ({
  type: CHANGE_MENU_TITLE,
  payload: title,
});

export const toggleMobileDrawer = () => ({
  type: TOGGLE_MOBILE_DRAWER,
});

export const menuReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_MENU_INDEX:
      return { ...state, index: action.payload };
    case CHANGE_MENU_TITLE:
      return { ...state, title: action.payload };
    case TOGGLE_MOBILE_DRAWER:
      return { ...state, mobileDrawer: !state.mobileDrawer };
    default:
      return state;
  }
};
