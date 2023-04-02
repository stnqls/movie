import React from "react";
import styled from "@emotion/styled";
import useSimilarTv from "../useSimilarTv";
import { AiOutlinePicture } from "react-icons/ai";

const Base = styled.section`
  padding: 11px 15px 20px;
  border-bottom: 1px solid #ededed;
`;

const HeaderWrapper = styled.div``;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  color: #000;
  font-size: 19px;
  font-weight: 700;
  margin: 8px 0;
`;

const ContentsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin-top: 15px;
  row-gap: 24px;
  place-items: center;
`;

const Link = styled.a`
  text-decoration: none;
`;

const CardContainer = styled.div`
  max-width: 160px;
`;

const PosterWrapper = styled.div`
  width: 160px;
  height: 220px;
  border: 1px solid rgb(234, 233, 232);
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  vertical-align: top;
  object-fit: cover;
`;

const Info = styled.div`
  margin: 5px 10px 0px 0px;
`;

const CardTitle = styled.div`
  color: rgb(41, 42, 50);
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NoPoster = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-color: #e1e2e2;
  color: #333;
  font-size: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface SimilarMovieProps {
  id: number;
  posterPath: string;
  title: string;
}

const SimilarTv: React.FC<SimilarMovieProps> = ({ id, posterPath, title }) => {
  return (
    <Link href={`/tv/${id}`} target="_blank">
      <CardContainer>
        <PosterWrapper>
          {posterPath !== null ? (
            <Poster
              src={`${process.env.REACT_APP_IMAGE_PREFIX}/${posterPath}`}
            />
          ) : (
            <NoPoster>
              <AiOutlinePicture />
              No Image
            </NoPoster>
          )}
        </PosterWrapper>
        <Info>
          <CardTitle>{title}</CardTitle>
        </Info>
      </CardContainer>
    </Link>
  );
};

interface Props {
  id: string;
}

const Similar: React.FC<Props> = ({ id }) => {
  const { isLoading, data } = useSimilarTv(id);

  return (
    <Base>
      <HeaderWrapper>
        <Header>
          <Title>비슷한 작품</Title>
        </Header>
      </HeaderWrapper>
      <ContentsWrapper>
        {isLoading || !data ? (
          <div>Loading</div>
        ) : (
          data.data.results.map((result) => (
            <SimilarTv
              key={`similar-movie-${result.id}`}
              id={result.id}
              posterPath={result.poster_path}
              title={result.name}
            />
          ))
        )}
      </ContentsWrapper>
    </Base>
  );
};

export default Similar;
