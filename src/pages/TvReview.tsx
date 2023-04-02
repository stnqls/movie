import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import styled from "@emotion/styled";
import DetailInfo from "../features/tv/detail/DetailInfo";
import useTvReview from "../features/tv/useTvReview";

const Base = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: #000;
  font-size: 23px;
  font-weight: 700;
  margin: 15px 0 20px;
  > span {
    font-size: 18px;
    font-weight: 500;
  }
`;

const ContentsWrapper = styled.div`
  /* margin-top: 15px; */
`;

const CardContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  padding: 10px;
  &:last-child {
    border-bottom: none;
  }
`;

const User = styled.div`
  align-self: center;
  width: 150px;
`;

const AuthorImgWrapper = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  margin: 0 auto;
  border: 1px solid rgb(234, 233, 232);
`;

const AuthorImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 100%;
`;

const AuthorName = styled.p`
  text-align: center;
  word-break: break-all;
`;

const Detail = styled.div`
  width: 810px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
`;

const Contents = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
  word-break: keep-all;
`;

const CreatedAt = styled.p`
  text-align: right;
  font-size: 15px;
  color: rgb(77, 77, 77);
  margin-top: auto;
`;

const NoReview = styled.div`
  font-size: 25px;
  text-align: center;
  padding: 100px;
`;

type Params = {
  id: string;
};

const TvReview: React.FC = () => {
  const { id } = useParams<Params>();
  const { isLoading, data } = useTvReview(id!);
  interface Props {
    authorName: string;
    authorImg: string;
    contents: string;
    createdAt: string;
  }

  const Review: React.FC<Props> = ({
    authorName,
    authorImg,
    contents,
    createdAt,
  }) => {
    let avatar = authorImg;
    if (avatar === null) {
      avatar = "/images/avatar.png";
    } else if (avatar.length < 35) {
      avatar = `${process.env.REACT_APP_IMAGE_PREFIX}/${authorImg}`;
    } else {
      avatar = avatar.substr(1);
    }

    return (
      <CardContainer>
        <User>
          <AuthorImgWrapper>
            <AuthorImg src={avatar} alt="Avatar" />
          </AuthorImgWrapper>
          <AuthorName>{authorName}</AuthorName>
        </User>
        <Detail>
          <Contents>{contents}</Contents>
          <CreatedAt>{createdAt.slice(0, 10)}</CreatedAt>
        </Detail>
      </CardContainer>
    );
  };

  return (
    <>
      <Header />
      <DetailInfo />
      {isLoading || !data ? (
        <div>Loading</div>
      ) : (
        <Base>
          <Title>
            리뷰 <span>(총 {data.data.total_results}개의 리뷰)</span>
          </Title>
          {data.data.total_results === 0 ? (
            <NoReview>리뷰가 없습니다.</NoReview>
          ) : (
            <ContentsWrapper>
              {data.data.results.reverse().map((result) => (
                <Review
                  key={`movieReview-${result.id}`}
                  authorName={result.author_details.username}
                  authorImg={result.author_details.avatar_path}
                  contents={result.content}
                  createdAt={result.created_at}
                />
              ))}
            </ContentsWrapper>
          )}
        </Base>
      )}
    </>
  );
};
export default TvReview;
