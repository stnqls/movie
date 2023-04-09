import useTrendingMovie from "./useTrendingMovie";
import styled from "@emotion/styled";
import Slider from "../../../components/Slide";
import Card from "../../../components/Card";
import { useEffect, useReducer, useState } from "react";

const Base = styled.div`
  margin-bottom: 42px;
`;

const Title = styled.h4`
  font-size: 22px;
  font-weight: 700;
  line-height: 30px;
  padding: 12px 0 14px;
  > span[class="primary"] {
    color: rgb(255, 47, 110);
  }
  > span:not(.primary) {
    color: #222;
  }
`;

const TrendingMovieSection = () => {
  const { isLoading, data } = useTrendingMovie();

  return (
    <Base>
      <Title>
        Trending <span className="primary">MOVIE</span>
      </Title>
      {isLoading || !data ? (
        <div> Loading...</div>
      ) : (
        <Slider>
          {data.data.results.map((movie) => (
            <Card
              key={movie.id}
              linkUrl={`/movie/${movie.id}`}
              title={movie.title}
              posterPath={`${process.env.REACT_APP_IMAGE_PREFIX}${movie.poster_path}`}
              voteAverage={movie.vote_average}
              year={movie.release_date}
              isPoster={movie.poster_path}
            />
          ))}
        </Slider>
      )}
    </Base>
  );
};

export default TrendingMovieSection;
