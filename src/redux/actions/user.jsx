import { getDataApi, postDataApi } from "../../utils/refreshDataApi";
import { GLOBALTYPES } from "./globalTypes";

export const USER_TYPES = {
  GET_ALL_USERS: "GET_ALL_USERS",
};

export const findAllUsers = (lang, pageData) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: true,
    });

    const res = await getDataApi(`users/findAll?lang=${lang}&page=${pageData.page}&perPage=${pageData.perPage}`);

    if (res.data.statusCode == 200) {
      dispatch({
        type: USER_TYPES.GET_ALL_USERS,
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