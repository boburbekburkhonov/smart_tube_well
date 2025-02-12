import { DASHBOARD_TYPES, getCountNotification } from "../actions/dashboard";
import { STATION_TYPES } from "../actions/station";

const initialState = {
  allStations: [],
  allStationsForSupervisor: [],
};

const station = (state = initialState, action) => {
  switch (action.type) {
    case STATION_TYPES.GET_ALL_STATIONS:
      return {
        ...state,
        allStations: action.payload,
      };
    case STATION_TYPES.GET_ALL_STATIONS_FOR_SUPERVISOR:
      return {
        ...state,
        allStationsForSupervisor: action.payload,
      };
    default:
      return state;
  }
};

export default station;