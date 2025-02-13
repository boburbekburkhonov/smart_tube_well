import { combineReducers } from "redux";
import theme from './themeReducer'
import auth from './authReducer'
import alert from './alertReducers'
import dashboard from './dashboard'
import notification from './notification'
import station from './station'
import application from './application'



export default combineReducers({
  theme,
  auth,
  alert,
  dashboard,
  notification,
  station,
  application
});
