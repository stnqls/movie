import { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { popularApi } from "../../../apis/movieApi";
import { ListResponse, MovieDetail } from "../../../types";

const usePopularMovie = () => {
  return useQuery<AxiosResponse<ListResponse<MovieDetail>>, AxiosError>(
    "popularMovie",
    popularApi
  );
};

export default usePopularMovie;
