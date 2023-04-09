import axiosInstance from "./index";

export const getInfoApi = () =>
  axiosInstance.get(
    `/account?api_key=${
      process.env.REACT_APP_API_KEY
    }&session_id=${window.sessionStorage.getItem("sessionId")}`
  );
