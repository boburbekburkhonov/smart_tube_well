import { getDataApi, postDataApi } from "../../utils/refreshDataApi";
import { GLOBALTYPES } from "./globalTypes";

export const DASHBOARD_TYPES = {
  GET_COUNT_NOTIFICATION: "GET_COUNT_NOTIFICATION",
  GET_USER_INFORMATION_BY_ID: "GET_USER_INFORMATION_BY_ID",
  UPDATED_USER_INFORMATION_BY_ID: "UPDATE_USER_INFORMATION_BY_ID",
};


export const getCountNotification = (lang) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: true,
    });

    const res = await getDataApi(`notifications/findIsReadNotificationsCount?lang=${lang}`);

    if (res.data.statusCode == 200) {
      dispatch({
        type: DASHBOARD_TYPES.GET_COUNT_NOTIFICATION,
        payload: res.data.data,
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

export const getUserInformationById = (userId, lang) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: true,
    });

    const res = await getDataApi(`users/findById?lang=${lang}&id=${userId}`);

    if (res.data.statusCode == 200) {
      dispatch({
        type: DASHBOARD_TYPES.GET_USER_INFORMATION_BY_ID,
        payload: res.data.data,
      });
    }
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.message,
      },
    });
  } finally {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: false,
    });
  }
};

export const isUserUpdated = () => async (dispatch) => {
  dispatch({
    type: DASHBOARD_TYPES.UPDATED_USER_INFORMATION_BY_ID,
    payload: {
      statusCode: 200,
    },
  });
};
