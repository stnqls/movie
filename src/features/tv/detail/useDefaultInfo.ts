import { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { translationApi } from "../../../apis/tvApi";
import { ListTranslations, TranslationDetail } from "../../../types";

const useDefaultInfo = (id: string) => {
  return useQuery<
    AxiosResponse<ListTranslations<TranslationDetail>>,
    AxiosError
  >(["translateTv", id], () => translationApi(id));
};

export default useDefaultInfo;
