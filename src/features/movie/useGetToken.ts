import { useQuery } from "react-query";
import { AxiosError, AxiosResponse } from "axios";

import { getToken } from "../../apis/authApi";

const useGetToken = () => {
  const queryFn = () => getToken();
  const { isLoading, isError, data } = useQuery<AxiosResponse, AxiosError>(
    "getToken",
    queryFn
  );

  return {
    isLoading,
    isError,
    data: data?.data,
  };
};

export default useGetToken;
