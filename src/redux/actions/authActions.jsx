import { postDataApi } from "../../utils";
import { GLOBALTYPES } from "./globalTypes";

export const AUTH_TYPES = {
  SIGN_IN: "SIGN_IN",
  RESET_PASSWORD: "RESET_PASSWORD",
  VERIFY_SIGN_IN: "VERIFY_SIGN_IN",
};
export const signInAction = (data, lang) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: true,
    });

    const res = await postDataApi(`auth/signIn?lang=${lang}`, {
      username: data.username,
      password: data.password,
    });

    if (res.data.statusCode == 200) {
      dispatch({
        type: AUTH_TYPES.SIGN_IN,
        payload: {
          statusCode: res.data.statusCode,
          username: data.username,
          password: data.password,
        },
      });
    }

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.message,
      },
    });
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

export const verifySignInAction = (data, lang) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: false,
    });

    const res = await postDataApi(`auth/verifyUser?lang=${lang}`, {
      username: data.username,
      code: data.code,
      deviceName: "Macbook Pro M2",
      deviceOS: "MacOS 15",
    });

    if (res.data.data.tokens != null) {
      localStorage.setItem('username', data.username)
      // localStorage.setItem('password', data.password)
      localStorage.setItem("roles", res.data.data.user.role.id);
      localStorage.setItem("access_token", res.data.data.tokens.accessToken);
      localStorage.setItem("refresh_token", res.data.data.tokens.refreshToken);
      localStorage.setItem('regionId', res.data.data.user.regionId)
      localStorage.setItem('districtId', res.data.data.user.districtId)
      localStorage.setItem('userId', res.data.data.user.id)

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          success: res.data.message,
        },
      });

      window.location.href = "/user";
    } else {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: res.data.message,
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

export const resetPasswordUser = (data, lang) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: true,
    });

    const res = await postDataApi(`auth/resetPasswordRequestCode?lang=${lang}`, {
      username: data.username,
      selectedSendType:"phone"
    });

    if (res.data.statusCode == 200) {
      dispatch({
        type: AUTH_TYPES.RESET_PASSWORD,
        payload: {
          statusCode: res.data.statusCode,
          username: data.username,
          password: data.password,
        },
      });
    }

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.message,
      },
    });
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