import { APPLICATION_TYPES } from "../actions/application";

const initialState = {
  allRequirements: [],
};

const application = (state = initialState, action) => {
  switch (action.type) {
    case APPLICATION_TYPES.GET_ALL_REQUIREMENT:
      return {
        ...state,
        allRequirements: action.payload,
      };
    default:
      return state;
  }
};

export default application;