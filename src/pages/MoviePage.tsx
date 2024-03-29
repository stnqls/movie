import styled from "@emotion/styled";
import LatestMoviesSection from "../features/movie/latest";
import NowPlayingSection from "../features/movie/nowPlaying";
import PopularSection from "../features/movie/popular";
import TopRateSection from "../features/movie/topRate";
import UpcomingSection from "../features/movie/upcoming";

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
`;

const Container = styled.div`
  margin-top: 62px;
  padding: 24px 0;
`;

const MoviePage = () => {
  return (
    <Main>
      <Container>
        <LatestMoviesSection />
        <NowPlayingSection />
        <PopularSection />
        <TopRateSection />
        <UpcomingSection />
      </Container>
    </Main>
  );
};
export default MoviePage;
