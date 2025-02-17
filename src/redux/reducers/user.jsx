import { USER_TYPES } from "../actions/user";

const initialState = {
  allUsers: [],
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_TYPES.GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    default:
      return state;
  }
};

export default user;