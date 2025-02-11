import { getDataApi, postDataApi } from "../../utils/refreshDataApi";
import { GLOBALTYPES } from "./globalTypes";

export const DASHBOARD_TYPES = {
  GET_ALL_NOTIFICATIONS: "GET_ALL_NOTIFICATIONS",
  GET_COUNT_NOTIFICATION: "GET_COUNT_NOTIFICATION",
  GET_IS_READ_NOTIFICATIONS: "GET_IS_READ_NOTIFICATIONS",
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

export const getIsReadNotifications = (lang) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: true,
    });

    const res = await getDataApi(`notifications/findAllNotifications?lang=${lang}`);
    // &isRead=false

    if (res.data.statusCode == 200) {
      dispatch({
        type: DASHBOARD_TYPES.GET_IS_READ_NOTIFICATIONS,
        payload: res.data.data.data,
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

export const getAllNotifications = (lang) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: true,
    });

    const res = await getDataApi(`notifications/findAllNotifications?lang=${lang}`);
    // &isRead=false

    if (res.data.statusCode == 200) {
      dispatch({
        type: DASHBOARD_TYPES.GET_ALL_NOTIFICATIONS,
        payload: res.data.data.data,
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
