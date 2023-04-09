import axiosInstance from "./index";

export const getToken = () =>
  axiosInstance.get(
    `/authentication/token/new?api_key=${process.env.REACT_APP_API_KEY}`
  );
