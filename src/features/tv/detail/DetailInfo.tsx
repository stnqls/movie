import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import useTvDetail from "../useTvDetail";

const Base = styled.div`
  position: relative;
  background-color: #f8f8f8;
`;

const Main = styled.div`
  padding: 14px 16px 22px;
  text-align: center;
  height: 300px;
  position: relative;
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
`;
const PosterWrapper = styled.div`
  width: 166px;
  height: 238px;
  border-bottom: solid 2px #fff;
  border-radius: 3px;
  box-shadow: 0 0 2px rgb(0 0 0 / 30%);
  background: #fff;
  position: absolute;
  bottom: 5%;
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ContentWrapper = styled.div`
  margin: 62px 0px 0px 235px;
  text-align: left;
`;

const Title = styled.h1`
  font-size: 33px;
  font-weight: 700;
  line-height: 40px;
`;

const Keyword = styled.div`
  font-size: 17px;
  font-weight: 400;
  margin-top: 4px;
  color: rgba(0, 0, 0, 0.5);
`;

const AverageRate = styled.div`
  font-size: 17px;
  font-weight: 400;
  line-height: 22px;
  padding: 8px 0;
  margin-top: 14px;
  border-top: 1px solid #ededed;
  border-bottom: 1px solid #ededed;
`;

type Params = {
  id: string;
};

const DetailInfo: React.FC = () => {
  const { id } = useParams<Params>();
  const { isLoading, data } = useTvDetail(id!);

  const year = useMemo(() => {
    return data?.first_air_date?.split("-")[0] || "";
  }, [data]);

  const genres = useMemo(() => {
    return data?.genres?.map((genre) => genre.name).join("/") || "";
  }, [data]);

  return (
    <Base>
      {isLoading || !data ? (
        <div>Loading</div>
      ) : (
        <Main>
          <PosterWrapper>
            <Poster
              src={`${process.env.REACT_APP_IMAGE_PREFIX}/${data.poster_path}`}
            />
          </PosterWrapper>
          <ContentWrapper>
            <Title>{data.name}</Title>
            <Keyword>
              {year} ・ {genres}
            </Keyword>
            <AverageRate>
              평균 ★{data.vote_average} ({data.vote_count}명)
            </AverageRate>
          </ContentWrapper>
        </Main>
      )}
    </Base>
  );
};

export default DetailInfo;
