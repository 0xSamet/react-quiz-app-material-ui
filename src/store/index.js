import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";
import { quizzesReducer } from "./quiz";
import { darkThemeReducer } from "./theme";
import { menuReducer } from "./menu";
import { authReducer } from "./auth";
import { registerReducer } from "./register";

const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
  darkTheme: darkThemeReducer,
  quizzes: quizzesReducer,
  menu: menuReducer,
});
//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

let store = createStore(rootReducer, compose(applyMiddleware(ReduxThunk)));

//store.subscribe(() => console.log(store.getState()));

export default store;
