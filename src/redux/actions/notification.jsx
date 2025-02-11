import { getDataApi } from "../../utils/refreshDataApi";
import { GLOBALTYPES } from "./globalTypes";

export const NOTIFICATION_TYPES = {
  FIND_ALL_NOTIFICATIONS: "FIND_ALL_NOTIFICATIONS",
};

export const findAllNotifications = (lang, pageData) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: true,
    });

    const res = await getDataApi(`notifications/findAllNotifications?lang=${lang}&page=${pageData.page}&perPage=${pageData.perPage}`);

    if (res.data.statusCode == 200) {
      dispatch({
        type: NOTIFICATION_TYPES.FIND_ALL_NOTIFICATIONS,
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