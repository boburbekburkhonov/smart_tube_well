import { getDataApi } from "../../utils/refreshDataApi";
import { GLOBALTYPES } from "./globalTypes";

export const DASHBOARD_TYPES = {
  GET_USER_INFORMATION_BY_ID: "GET_USER_INFORMATION_BY_ID",
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
        payload: res.data.data
      });
    }

  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.message,
      }
    });
  } finally {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: false,
    });
  }
};