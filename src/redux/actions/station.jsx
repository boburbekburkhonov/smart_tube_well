import { getDataApi, postDataApi } from "../../utils/refreshDataApi";
import { GLOBALTYPES } from "./globalTypes";

export const STATION_TYPES = {
  GET_ALL_STATIONS: "GET_ALL_STATIONS",
  GET_ALL_STATIONS_FOR_SUPERVISOR: "GET_ALL_STATIONS_FOR_SUPERVISOR",
};

export const findAllStationsForUser = (lang) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: true,
    });

    const res = await getDataApi(`stations/findAll?lang=${lang}`);

    const [response] = res.data.data.data

    if (res.data.statusCode == 200) {
      dispatch({
        type: STATION_TYPES.GET_ALL_STATIONS,
        payload: response,
      });
    }

  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response?.data.message,
      },
    });
  } finally {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: false,
    });
  }
};

export const findAllStationsForSupervisor = (lang, pageData) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: true,
    });

    const res = await getDataApi(`stations/findAll?lang=${lang}&page=${pageData.page}&perPage=${pageData.perPage}`);

    if (res.data.statusCode == 200) {
      dispatch({
        type: STATION_TYPES.GET_ALL_STATIONS_FOR_SUPERVISOR,
        payload: {
          data: res.data.data.data,
          totalDocuments: res.data.data.totalDocuments
        },
      });
    }

  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response?.data.message,
      },
    });
  } finally {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: false,
    });
  }
};