import { AUTH_TYPES } from "../actions/authActions";

const initialState = {
  signInMessage: [],
  resetPasswordMessage: []
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_TYPES.SIGN_IN:
      return {
        ...state,
        signInMessage: action.payload,
      };
    case AUTH_TYPES.RESET_PASSWORD:
      return {
        ...state,
        resetPasswordMessage: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
