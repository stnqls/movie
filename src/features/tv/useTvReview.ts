import { useQuery } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { reviewApi } from "../../apis/tvApi";
import { ListResponse, Review } from "../../types";

const useTvReview = (id: string) => {
  return useQuery<AxiosResponse<ListResponse<Review>>, AxiosError>(
    ["reviewTv", id],
    () => reviewApi(id)
  );
};

export default useTvReview;
