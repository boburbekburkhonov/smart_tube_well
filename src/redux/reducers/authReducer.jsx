import { AUTH_TYPES } from "../actions/authActions";

const initialState = {
  signInMessage: [],
  verifySignInMessage: [],
  resetPasswordMessage: [],
  changeMessage: [],
  verifyResetPasswordMessage: []
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_TYPES.SIGN_IN:
      return {
        ...state,
        signInMessage: action.payload,
      };
    case AUTH_TYPES.VERIFY_SIGN_IN:
      return {
        ...state,
        verifySignInMessage: action.payload,
      };
    case AUTH_TYPES.RESET_PASSWORD:
      return {
        ...state,
        resetPasswordMessage: action.payload,
      };
    case AUTH_TYPES.CHANGE_PASSWORD:
      return {
        ...state,
        changeMessage: action.payload,
      };
    case AUTH_TYPES.VERIFY_RESET_PASSWORD:
      return {
        ...state,
        verifyResetPasswordMessage: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
