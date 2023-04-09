import styled from "@emotion/styled";
import TrendingMovieSection from "../features/movie/trending";
import TrendingTvSection from "../features/tv/trending";

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 62px;
`;

const MainPage = () => {
  return (
    <Main>
      <TrendingMovieSection />
      <TrendingTvSection />
    </Main>
  );
};
export default MainPage;
