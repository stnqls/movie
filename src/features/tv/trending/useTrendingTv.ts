import { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { ListResponse, Trending } from "../../../types";
import { trendingApi } from "../../../apis/tvApi";

const useTrendingTv = () => {
  return useQuery<AxiosResponse<ListResponse<Trending>>, AxiosError>(
    "trendingTv",
    trendingApi
  );
};

export default useTrendingTv;
