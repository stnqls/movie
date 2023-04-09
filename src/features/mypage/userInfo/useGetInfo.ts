import { useQuery } from "react-query";
import { getInfoApi } from "../../../apis/account";
import { AxiosError, AxiosResponse } from "axios";

const useGetInfo = () => {
  return useQuery<AxiosResponse, AxiosError>("getInfo", getInfoApi);
};

export default useGetInfo;
