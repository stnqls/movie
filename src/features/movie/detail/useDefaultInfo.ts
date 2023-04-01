import { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { translationApi } from "../../../apis/movieApi";
import { ListTranslations, TranslationDetail } from "../../../types";

const useDefaultInfo = (id: string) => {
  return useQuery<
    AxiosResponse<ListTranslations<TranslationDetail>>,
    AxiosError
  >(["translateMovie", id], () => translationApi(id));
};

export default useDefaultInfo;
