import { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { onTheAirApi } from "../../../apis/tvApi";
import { ListResponse, TVDetail } from "../../../types";

const useOnTheAirTv = () => {
  return useQuery<AxiosResponse<ListResponse<TVDetail>>, AxiosError>(
    "onTheAirApi",
    onTheAirApi
  );
};

export default useOnTheAirTv;
