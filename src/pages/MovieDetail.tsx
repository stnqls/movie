import React, { useMemo } from "react";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import useMovieDetail from "../features/movie/useMovieDetail";
import {
  AiOutlinePlus,
  AiFillStar,
  AiOutlineEye,
  AiOutlinePicture,
} from "react-icons/ai";
import { FaPen } from "react-icons/fa";
import { Rating } from "@mui/material";
import DefaultInfo from "../features/movie/detail/DefaultInfo";
import Similar from "../features/movie/detail/Similar";

const Base = styled.div`
  position: relative;
  background-color: #f8f8f8;
  margin-top: 62px;
`;
const TopInfo = styled.div`
  border-bottom: 1px solid rgb(227, 227, 227);
  background: rgb(255, 255, 255);
`;

const PosterContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Backdrop = styled.div`
  display: flex;
  width: 100%;
  height: 400px;
  background-image: linear-gradient(
    -180deg,
    rgba(0, 0, 0, 0.35) 2%,
    rgba(0, 0, 0, 0.2) 70%,
    rgba(0, 0, 0, 0.5) 100%
  );
  overflow: hidden;
`;

const BackdropImage = styled.div<{ imageUrl: string }>`
  background: url(${({ imageUrl }) => imageUrl}) center center / cover no-repeat;
  width: 1200px;
  position: relative;
  top: auto;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  filter: blur(1.7px);
`;

const PosterWrapper = styled.div`
  position: absolute;
  width: 185px;
  height: 265px;
  border-bottom: solid 2px #fff;
  top: -60px;
  left: 0;
  border-radius: 3px;
  box-shadow: 0 0 2px rgb(0 0 0 / 30%);
  background: #fff;
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Main = styled.div`
  padding: 14px 16px 22px;
  text-align: center;
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
`;

const ContentWrapper = styled.div`
  margin: 0px 0px 0px 212px;
  text-align: left;
  height: 200px;
`;

const Title = styled.h1`
  font-size: 33px;
  font-weight: 700;
  line-height: 40px;
`;

const AverageRate = styled.div`
  font-size: 17px;
  font-weight: 400;
  line-height: 22px;
  padding: 8px 0;
  margin-top: 14px;
  border-top: 1px solid #ededed;
  border-bottom: 1px solid #ededed;
  display: flex;
`;

const Actions = styled.div`
  margin-top: 20px;
  height: 58px;
  display: flex;
  align-items: center;
`;

const StarRate = styled.div`
  width: 238px;
  height: 57px;
  margin: 0;
  text-align: center;
  display: flex;
  align-items: center;
  padding: 0 30px;
`;

const StarRateText = styled.div`
  font-size: 14px;
  line-height: 16px;
  margin-right: 5px;
`;

const Divider = styled.div`
  width: 1px;
  height: 100%;
  background: #ededed;
  float: left;
`;

const ActionButtonContainer = styled.div`
  width: 461px;
  padding: 0 30px;
  margin-top: 0 -16px;
  display: flex;
  align-items: center;
`;

const ActionButton = styled.button`
  border: none;
  background: transparent;
  font-size: 14px;
  margin: 0 16px;
  display: flex;
  align-items: center;
  cursor: pointer;

  > svg {
    margin-right: 7px;
  }
  &:hover {
    > svg {
      transform: scale(1.4);
    }
  }
`;

const Link = styled.a`
  text-decoration: none;
  color: black;
`;

const BottomInfo = styled.div`
  padding: 28px 0 48px;
  max-width: 1000px;
  margin: 0 auto;
`;

const ContentSectionContainer = styled.div`
  border-right: 1px solid;
  border-left: 1px solid;
  border-top: 1px solid;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  background: #fff;
  border-color: #e3e3e3;
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
type Params = {
  id?: string;
};

const MovieDetail: React.FC = () => {
  const { id } = useParams<Params>();
  const { isLoading, data } = useMovieDetail(id!);
  const country = data?.production_countries[0]?.name || "";
  const genres = useMemo(() => {
    return data?.genres?.map((genre) => genre.name).join(" / ") || "";
  }, [data]);

  return (
    <Base>
      <>
        {isLoading || !data ? (
          <div>Loading</div>
        ) : (
          <>
            <TopInfo>
              <PosterContainer>
                <Backdrop>
                  <BackdropImage
                    imageUrl={`${process.env.REACT_APP_IMAGE_PREFIX}/${data.backdrop_path}`}
                  ></BackdropImage>
                </Backdrop>
              </PosterContainer>

              <Main>
                <Container>
                  <PosterWrapper>
                    {data.poster_path !== null ? (
                      <Poster
                        src={`${process.env.REACT_APP_IMAGE_PREFIX}/${data.poster_path}`}
                      />
                    ) : (
                      <NoPoster>
                        <AiOutlinePicture />
                        No Image
                      </NoPoster>
                    )}
                  </PosterWrapper>
                  <ContentWrapper>
                    <Title>{data.title}</Title>
                    <AverageRate>
                      평점
                      <AiFillStar
                        style={{
                          color: "rgb(255, 60, 11)",
                          display: "block",
                          margin: "2px 3px 0",
                        }}
                      />
                      {data.vote_average.toFixed(2)} ({data.vote_count}명)
                    </AverageRate>
                    <Actions>
                      <StarRate>
                        <StarRateText>평가하기</StarRateText>
                        <Rating />
                      </StarRate>
                      <Divider />

                      <ActionButtonContainer>
                        <ActionButton>
                          <AiOutlinePlus />
                          보고싶어요
                        </ActionButton>
                        <ActionButton>
                          <FaPen />
                          리뷰 쓰기
                        </ActionButton>
                        <ActionButton>
                          <AiOutlineEye />
                          <Link href={`/movie/${id}/reviews`}>리뷰 보기</Link>
                        </ActionButton>
                      </ActionButtonContainer>
                    </Actions>
                  </ContentWrapper>
                </Container>
              </Main>
            </TopInfo>

            <BottomInfo>
              <ContentSectionContainer>
                <DefaultInfo
                  title={data.title}
                  year={data.release_date}
                  genres={genres}
                  runtime={data.runtime}
                  overview={data.overview}
                  id={id!}
                  contries={country}
                />
                <Similar id={id!} />
              </ContentSectionContainer>
            </BottomInfo>
          </>
        )}
      </>
    </Base>
  );
};
export default MovieDetail;
