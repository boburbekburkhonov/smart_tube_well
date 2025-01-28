import { AUTH_TYPES } from "../actions/authActions";

const initialState = {
  signInMessage: []
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_TYPES.SIGN_IN:
      return {
        ...state,
        signInMessage: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
