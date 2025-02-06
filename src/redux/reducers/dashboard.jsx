import { DASHBOARD_TYPES } from "../actions/dashboard";

const initialState = {
  userInformationById: [],
  updatedUserInformationById: [],
};

const dashboard = (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_TYPES.GET_USER_INFORMATION_BY_ID:
      return {
        ...state,
        userInformationById: action.payload,
      };
    case DASHBOARD_TYPES.UPDATED_USER_INFORMATION_BY_ID:
      return {
        ...state,
        updatedUserInformationById: action.payload,
      };
    default:
      return state;
  }
};

export default dashboard;
