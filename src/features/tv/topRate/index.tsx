import React from "react";
import styled from "@emotion/styled";
import useTopRateTv from "./useTopRateTv";
import Card from "../../../components/Card";
import Slide from "../../../components/Slide";

const Base = styled.div`
  margin-bottom: 62px;
`;

const Title = styled.h4`
  font-size: 22px;
  font-weight: 700;
  line-height: 30px;
  padding: 12px 0 14px;
`;

const TopRateTvSection: React.FC = () => {
  const { data, isLoading } = useTopRateTv();
  const getYear = (date: string) => date.split("-")[0];

  return (
    <Base>
      <Title>최고 평점</Title>
      {isLoading || !data ? (
        <div>Loading</div>
      ) : (
        <Slide>
          {data.data.results.map((tv) => (
            <Card
              key={`top-rate-tv-${tv.id}`}
              linkUrl={`/tv/${tv.id}`}
              title={tv.name}
              posterPath={`${process.env.REACT_APP_IMAGE_PREFIX}/${tv.poster_path}`}
              voteAverage={tv.vote_average}
              year={getYear(tv.first_air_date)}
            />
          ))}
        </Slide>
      )}
    </Base>
  );
};

export default TopRateTvSection;
