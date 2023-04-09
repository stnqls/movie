import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MainPage from "./pages/MainPage";
import TvPage from "./pages/TvPage";
import TvDetail from "./pages/TvDetail";
import MovieDetail from "./pages/MovieDetail";
import TvReview from "./pages/TvReview";
import MovieReview from "./pages/MovieReview";
import MoviePage from "./pages/MoviePage";
import Login from "./pages/Login";
import Redirect from "./components/Redirect";
import MyPage from "./pages/MyPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/redirect" element={<Redirect />} />
        <Route path="/tv/:id/reviews" element={<TvReview />} />
        <Route path="/tv/:id" element={<TvDetail />} />
        <Route path="/tv" element={<TvPage />} />
        <Route path="/movie/:id/reviews" element={<MovieReview />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/movie" element={<MoviePage />} />
      </Routes>
    </Router>
  );
}

export default App;
