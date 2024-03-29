import React from "react";
import styled from "@emotion/styled";
import useTodayTv from "./useTodayTv";
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

const AiringTodayTvSection: React.FC = () => {
  const { data, isLoading } = useTodayTv();
  const getYear = (date: string) => date.split("-")[0];

  return (
    <Base>
      <Title>Airing Today</Title>
      {isLoading || !data ? (
        <div>Loading</div>
      ) : (
        <Slide>
          {data.data.results.map((tv) => (
            <Card
              key={`airing-today-${tv.id}`}
              linkUrl={`/tv/${tv.id}`}
              title={tv.name}
              posterPath={`${process.env.REACT_APP_IMAGE_PREFIX}/${tv.poster_path}`}
              voteAverage={tv.vote_average}
              year={getYear(tv.first_air_date)}
              isPoster={tv.poster_path}
            />
          ))}
        </Slide>
      )}
    </Base>
  );
};

export default AiringTodayTvSection;
