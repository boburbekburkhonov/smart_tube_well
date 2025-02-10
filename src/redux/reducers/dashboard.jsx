import { DASHBOARD_TYPES, getCountNotification } from "../actions/dashboard";

const initialState = {
  countNotification: [],
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
    case DASHBOARD_TYPES.GET_COUNT_NOTIFICATION:
      return {
        ...state,
        countNotification: action.payload,
      };
    default:
      return state;
  }
};

export default dashboard;
