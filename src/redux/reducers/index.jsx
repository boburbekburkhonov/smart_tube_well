import { combineReducers } from "redux";
import theme from './themeReducer'
import auth from './authReducer'



export default combineReducers({
  theme,
  auth
});
