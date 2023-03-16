import styled from "@emotion/styled";
import Slider from "../../../components/Slide";
import Card from "../../../components/Card";
import useTrendingTv from "./useTrendingTv";

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

const TrendingTvSection = () => {
  const { isLoading, data } = useTrendingTv();

  return (
    <Base>
      <Title>
        Trending <span className="primary">TV</span>
      </Title>
      {isLoading || !data ? (
        <div> Loading...</div>
      ) : (
        <Slider>
          {data.data.results.map((tv) => (
            <Card
              key={tv.id}
              linkUrl={`/tv/${tv.id}`}
              title={tv.name}
              posterPath={`${process.env.REACT_APP_IMAGE_PREFIX}${tv.poster_path}`}
              voteAverage={tv.vote_average}
              year={tv.first_air_date}
              isPoster={tv.poster_path}
            />
          ))}
        </Slider>
      )}
    </Base>
  );
};

export default TrendingTvSection;
