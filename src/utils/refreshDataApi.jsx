import axios from "axios";
import { api } from "../API";

// ! CUSTOM FETCH
const customFetch = axios.create({
  baseURL: api,
  headers: {
    "Content-type": "application/json",
  },
});

// ! ADD HEADER TOKEN
customFetch.interceptors.request.use(
  async (config) => {
    const token = window.localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = ` bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ! REFRESH TOKEN
const refreshToken = async () => {
  try {
    const refeshToken = window.localStorage.getItem("refresh_token");
    const requestToken = await fetch(`${api}/auth/refreshToken?lang=uz`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Authorization": `bearer ${refeshToken}`
      }
    });

    const responToken = await requestToken.json();
    return {
      accessToken: responToken.data?.accessToken,
      refreshToken: responToken.data?.refreshToken
    };
  } catch (e) {
    console.log("refreshToken", "Error", e);
  }
};

// ! GET ACCESS TOKEN
customFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (
      (error.response?.status === 403 && !originalRequest._retry) ||
      (error.response?.status === 401 && !originalRequest._retry)
    ) {
      originalRequest._retry = true;

      const resp = await refreshToken();

      const response = resp;

      window.localStorage.setItem("access_token", response.accessToken);
      window.localStorage.setItem("refresh_token", response.refreshToken);

      customFetch.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.accessToken}`;
      return customFetch(originalRequest);
    }
    return Promise.reject(error);
  }
);


export const getDataApi = async (url) => {
  const res = await customFetch.get(`${api}/${url}`);

  return res;
};

export const postDataApi = async (url, post) => {
  const res = await customFetch.post(`${api}/${url}`, post);

  return res;
};