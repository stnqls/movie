import styled from "@emotion/styled";
import useLatestMovie from "./useLatestMovie";
import Card from "../../../components/Card";

const Base = styled.div`
  margin-bottom: 42px;
`;

const Title = styled.h4`
  font-size: 22px;
  font-weight: 700;
  line-height: 30px;
  padding: 12px 0 14px;
`;

const LatestMoviesSection = () => {
  const { data, isLoading } = useLatestMovie();

  const getYear = (date: string) => date.split("-")[0];

  if (data?.data.poster_path === null) {
    // const moviePoster = getPosterApi();
  }

  return (
    <Base>
      <Title>최근 개봉작</Title>
      {isLoading || !data ? (
        <div> Loading...</div>
      ) : (
        <Card
          linkUrl={`/movie/${data.data.id}`}
          title={data.data.title}
          posterPath={`${
            data.data.poster_path
              ? process.env.REACT_APP_IMAGE_PREFIX + data.data.poster_path
              : null
          }`}
          voteAverage={data.data.vote_average}
          year={getYear(data.data.release_date)}
          isPoster={data.data.poster_path}
        />
      )}
    </Base>
  );
};

export default LatestMoviesSection;
