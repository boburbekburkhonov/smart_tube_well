import { postDataApi } from "../../utils";
import { GLOBALTYPES } from "./globalTypes";

export const AUTH_TYPES = {
  SIGN_IN: "SIGN_IN",
};
export const signInAction = (data, lang) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: false,
    });

    const res = await postDataApi(`auth/signIn?lang=${lang}`, {
      username: data.username,
      password: data.password,
    });

    if(res.data.statusCode == 200){
      dispatch({
      type: AUTH_TYPES.SIGN_IN,
      payload: {
        statusCode: res.data.statusCode,
        username: data.username,
        password: data.password,
      },
      });
    }

    // dispatch({
    //   type: GLOBALTYPES.AUTH,
    //   payload: {
    //     token: res.data.data,
    //   },
    // });

    // dispatch({
    //   type: GLOBALTYPES.ALERT,
    //   payload: {
    //     success: res.data.message,
    //   },
    // });

    // window.location.href = '/'
  } catch (err) {
    dispatch({
      type: AUTH_TYPES.SIGN_IN,
      payload: {
        statusCode: err.response.data.statusCode,
        message: err.response.data.message,
      },
      });
  } finally {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: false,
    });

  }
};