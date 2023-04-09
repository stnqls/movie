import { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { searchApi } from "../../apis/movieApi";
import { ListResponse, Movie } from "../../types";

const useMovieSearch = (query: string) => {
  const queryFn = () => searchApi(query);
  const { isLoading, isError, data } = useQuery<
    AxiosResponse<ListResponse<Movie>>,
    AxiosError
  >(["searchMovie", query], queryFn, { enabled: Boolean(query) });
  return {
    isLoading,
    isError,
    data: data?.data,
  };

  // return useQuery<AxiosResponse<ListResponse<Movie>>, AxiosError>(
  //   ["searchMovie", query],
  //   () => searchApi(query),
  //   { enabled: Boolean(query) }
  // );
};

export default useMovieSearch;
