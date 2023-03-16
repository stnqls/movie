import styled from "@emotion/styled";
import Footer from "../components/Footer";
import Header from "../components/Header";
import TrendingMovieSection from "../features/movie/trending";
import TrendingTvSection from "../features/tv/trending";

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 62px;
`;

const MainPage = () => {
  return (
    <>
      <Header />
      <Main>
        <TrendingMovieSection />
        <TrendingTvSection />
      </Main>
      <Footer />
    </>
  );
};
export default MainPage;
