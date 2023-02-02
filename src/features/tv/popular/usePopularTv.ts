import { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { popularApi } from "../../../apis/tvApi";
import { ListResponse, TVDetail } from "../../../types";

const usePopularTv = () => {
  return useQuery<AxiosResponse<ListResponse<TVDetail>>, AxiosError>(
    "popularApi",
    popularApi
  );
};

export default usePopularTv;
