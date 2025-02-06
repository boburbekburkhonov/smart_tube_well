import { combineReducers } from "redux";
import theme from './themeReducer'
import auth from './authReducer'
import alert from './alertReducers'
import dashboard from './dashboard'



export default combineReducers({
  theme,
  auth,
  alert,
  dashboard
});
