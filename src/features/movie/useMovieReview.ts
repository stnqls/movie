import { useQuery } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { reviewApi } from "../../apis/movieApi";
import { ListResponse, Review } from "../../types";

const useMovieReview = (id: string) => {
  return useQuery<AxiosResponse<ListResponse<Review>>, AxiosError>(
    ["reviewMovie", id],
    () => reviewApi(id)
  );
};

export default useMovieReview;
