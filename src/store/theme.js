const INITIAL_STATE = false;

export const changeTheme = () => ({
  type: "CHANGE_THEME",
});

export const darkThemeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "CHANGE_THEME":
      return !state;
    default:
      return state;
  }
};
