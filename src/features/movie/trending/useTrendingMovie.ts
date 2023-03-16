import { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { ListResponse, Trending } from "../../../types";
import { trendingApi } from "../../../apis/movieApi";

const useTrendingMovie = () => {
  return useQuery<AxiosResponse<ListResponse<Trending>>, AxiosError>(
    "trendingMovie",
    trendingApi
  );
};

export default useTrendingMovie;
