import { NOTIFICATION_TYPES } from "../actions/notification";

const initialState = {
  getAllNotifications: [],
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION_TYPES.FIND_ALL_NOTIFICATIONS:
      return {
        ...state,
        getAllNotifications: action.payload,
      };
    default:
      return state;
  }
};

export default notificationReducer;
