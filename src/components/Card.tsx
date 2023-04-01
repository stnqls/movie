import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import "slick-carousel/slick/slick.css";

interface Props {
  linkUrl: string;
  title: string;
  year: string;
  posterPath: string;
  voteAverage: number;
  isPoster: string;
}

const StyledLink = styled(Link)`
  text-decoration: none;
  display: block;
  margin-inline: 10px;
`;

const Base = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 300px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`;

const NoPoster = styled.div`
  width: 100%;
  height: 300px;
  background-color: #000;
  display: table;
`;

const NoPosterName = styled.h2`
  font-size: 25px;
  text-align: center;
  margin: 0;
  vertical-align: middle;
  color: #fff;
  font-weight: lighter;
  display: table-cell;
`;

const Info = styled.div`
  text-align: left;
  width: 100%;
`;

const Title = styled.h4`
  color: #141416;
  font-size: 16px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 22px;
  margin-bottom: 3px;
  white-space: nowrap;
  max-width: 200px;
`;

const Keyword = styled.div`
  color: #292a32;
  padding-bottom: 1px;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
`;

const Average = styled.div`
  color: #292a32;
  font-size: 13px;
  font-weight: 400;
  margin-top: 5px;
  display: flex;
  align-items: center;
`;
const Card: React.FC<Props> = ({
  linkUrl,
  title,
  posterPath,
  voteAverage,
  year,
  isPoster,
}) => {
  return (
    <StyledLink to={linkUrl}>
      <Base>
        <ImageWrapper>
          {isPoster === null ? (
            <NoPoster>
              <NoPosterName>등록된 포스터가 없습니다.</NoPosterName>
            </NoPoster>
          ) : (
            <Image src={`${posterPath}`} alt={`${title}`} />
          )}
        </ImageWrapper>
        <Info>
          <Title>{title}</Title>
          <Keyword>개봉 {year}</Keyword>
          <Average>
            <span>평점</span>
            <AiFillStar
              style={{
                color: "rgb(255, 60, 11)",
                display: "block",
                margin: "2px 3px 0",
              }}
            />
            <span>{voteAverage.toFixed(2)}</span>
          </Average>
        </Info>
      </Base>
    </StyledLink>
  );
};
export default Card;
