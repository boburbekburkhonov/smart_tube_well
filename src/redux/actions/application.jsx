import { getDataApi, postDataApi } from "../../utils/refreshDataApi";
import { GLOBALTYPES } from "./globalTypes";

export const APPLICATION_TYPES = {
  GET_ALL_REQUIREMENT: "GET_ALL_REQUIREMENT",
};

export const findAllRequirementForUser =
  (supervisorId, userId, status, lang, pageData) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.LOADING,
        payload: true,
      });

      if (supervisorId == "null") {
        const res = await getDataApi(
          `requirement-table/findAll?lang=${lang}&supervisorUserId=${userId}&page=${pageData.page}&perPage=${pageData.perPage}&status=${status}`
        );

        if (res.data.statusCode == 200) {
          dispatch({
            type: APPLICATION_TYPES.GET_ALL_REQUIREMENT,
            payload: {
              data: res.data.data.data,
              totalDocuments: res.data.data.totalDocuments,
            },
          });
        }
      } else {
        const res = await getDataApi(
          `requirement-table/findAll?lang=${lang}&supervisorUserId=${supervisorId}&page=${pageData.page}&perPage=${pageData.perPage}&status=${status}&userId=${userId}`
        );

        if (res.data.statusCode == 200) {
          dispatch({
            type: APPLICATION_TYPES.GET_ALL_REQUIREMENT,
            payload: {
              data: res.data.data.data,
              totalDocuments: res.data.data.totalDocuments,
            },
          });
        }
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
