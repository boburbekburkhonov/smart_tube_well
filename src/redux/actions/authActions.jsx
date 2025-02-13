import { postDataApi } from "../../utils";
import { GLOBALTYPES } from "./globalTypes";

export const AUTH_TYPES = {
  SIGN_IN: "SIGN_IN",
  RESET_PASSWORD: "RESET_PASSWORD",
  CHANGE_PASSWORD: "CHANGE_PASSWORD",
  VERIFY_SIGN_IN: "VERIFY_SIGN_IN",
  VERIFY_RESET_PASSWORD: "VERIFY_RESET_PASSWORD",
  GET_USER_INFORMATION_BY_ID: "GET_USER_INFORMATION_BY_ID",
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

  } catch (err) {
    dispatch({
      type: AUTH_TYPES.SIGN_IN,
      payload: {
        statusCode: 400,
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
      localStorage.setItem("username", data.username);
      // localStorage.setItem('password', data.password)
      localStorage.setItem("role", res.data.data.user.role.code);
      localStorage.setItem("firstName", res.data.data.user.firstName);
      localStorage.setItem("access_token", res.data.data.tokens.accessToken);
      localStorage.setItem("refresh_token", res.data.data.tokens.refreshToken);
      localStorage.setItem("regionId", res.data.data.user.regionId);
      localStorage.setItem("districtId", res.data.data.user.districtId);
      localStorage.setItem("userId", res.data.data.user.id);
      localStorage.setItem("supervisorId", res.data.data.user.supervisorUserId);

      if (res.data.data.user.role.code == "user") {
        window.location.href = "/user";
      } else if (res.data.data.user.role.code == "supervisor") {
        window.location.href = "/supervisor";
      }
    } else {
      dispatch({
        type: AUTH_TYPES.VERIFY_SIGN_IN,
        payload: {
          statusCode: 400,
          message: res.data.message,
          devices: res.data.data.devices
        },
      });
    }
  } catch (err) {
    dispatch({
      type: AUTH_TYPES.VERIFY_SIGN_IN,
      payload: {
        statusCode: 400,
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

export const moreDevicesDeleteToSignInAction = (data, lang) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: false,
    });

    const res = await postDataApi(`auth/moreDevicesDeleteSignIn?lang=${lang}`,data);

    if (res.data.data.tokens != null) {
      localStorage.setItem("username", data.username);
      // localStorage.setItem('password', data.password)
      localStorage.setItem("role", res.data.data.user.role.code);
      localStorage.setItem("firstName", res.data.data.user.firstName);
      localStorage.setItem("access_token", res.data.data.tokens.accessToken);
      localStorage.setItem("refresh_token", res.data.data.tokens.refreshToken);
      localStorage.setItem("regionId", res.data.data.user.regionId);
      localStorage.setItem("districtId", res.data.data.user.districtId);
      localStorage.setItem("userId", res.data.data.user.id);
      localStorage.setItem("supervisorId", res.data.data.user.supervisorUserId);

      if (res.data.data.user.role.code == "user") {
        window.location.href = "/user";
      } else if (res.data.data.user.role.code == "supervisor") {
        window.location.href = "/supervisor";
      }
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

    const res = await postDataApi(
      `auth/resetPasswordRequestCode?lang=${lang}`,
      {
        username: data.username,
        selectedSendType: "phone",
      }
    );

    if (res.data.statusCode == 200) {
      dispatch({
        type: AUTH_TYPES.RESET_PASSWORD,
        payload: {
          statusCode: res.data.statusCode,
          username: data.username,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: AUTH_TYPES.RESET_PASSWORD,
      payload: {
        statusCode: 400,
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

export const verifyResetPasswordUser = (data, lang) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: false,
    });

    const res = await postDataApi(`auth/verifyResetPasswordCode?lang=${lang}`, {
      username: data.username,
      code: data.code,
    });

    if (res.data.statusCode == 200) {
      dispatch({
        type: AUTH_TYPES.VERIFY_RESET_PASSWORD,
        payload: {
          statusCode: res.data.statusCode,
          username: data.username,
        },
      });
    }

  } catch (err) {
    dispatch({
      type: AUTH_TYPES.VERIFY_RESET_PASSWORD,
      payload: {
        statusCode: 400,
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

export const changePasswordUser = (data, lang) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.LOADING,
      payload: false,
    });

    const res = await postDataApi(`auth/resetPassword?lang=${lang}`, {
      username: data.username,
      password: data.password,
    });

    if (res.data.statusCode == 200) {
      dispatch({
        type: AUTH_TYPES.CHANGE_PASSWORD,
        payload: {
          statusCode: res.data.statusCode,
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
