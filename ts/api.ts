import axios, { HttpStatusCode } from "axios";
import SweetAlert from "./sweet-alert";
import { SESSION_PARAMS } from "~~/ts/constants";
import { useStore } from "~/stores/common";
import { Common } from "./_utils/common";

export const API_URL = "https://api.kujungmaru.com/api/v1/";

export const api = axios.create({
  baseURL: API_URL,
  headers: sessionStorage.getItem(SESSION_PARAMS.ACCESS_TOKEN)
    ? {
        Authorization: `Bearer ${sessionStorage.getItem(
          SESSION_PARAMS.ACCESS_TOKEN
        )}`,
      }
    : {},
  onUploadProgress: () => {
    const store = useStore();
    store.setIsLoading(true);
  },
  onDownloadProgress: () => {},
});

export function setToken(access_token: string) {
  sessionStorage.setItem(SESSION_PARAMS.ACCESS_TOKEN, access_token);
  api.defaults.headers.common.Authorization = `Bearer ${access_token}`;
}

api.interceptors.response.use(
  function (response) {
    // Do something before request is sent
    const store = useStore();
    store.setIsLoading(false);
    return response.data;
  },
  function (error) {
    const store = useStore();
    store.setIsLoading(false);
    // Do something with request error
    if (error.response.status == HttpStatusCode.Unauthorized) {
      if (!error.response.config.url.includes("/auth/user/profile")) {
        SweetAlert.openAlert(
          error.response.data.errMsg,
          "",
          '<img src="/img/icons/error.svg">'
        );
        navigateTo("/login");
      }
      return;
    } else {
      Common.showErrorToast(error.response.data.errMsg);
      return error.response.data;
    }
  }
);

export const uploadFile = async (
  file: File,
  fileCategory: string,
  thumbYb: string
): Promise<any> => {
  try {
    var formData = new FormData();
    formData.append("files", file);
    formData.append("file_category", fileCategory);
    formData.append("thumb_yb", thumbYb);

    let response = await api.post(API_URL + "file", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadFiles = async (
  files: Array<File>,
  fileCategory: string,
  thumbYb: string
): Promise<any> => {
  try {
    var formData = new FormData();
    files.forEach((file: any) => formData.append("files", file));
    formData.append("file_category", fileCategory);
    formData.append("thumb_yb", thumbYb);

    let response = await api.post(API_URL + "file", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
