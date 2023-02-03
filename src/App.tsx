import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import MainPage from "./pages/MainPage";
import TvPage from "./pages/TvPage";
import TvDetail from "./pages/TvDetail";
import MovieDetail from "./pages/MovieDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/tv/:id" element={<TvDetail />} />
        <Route path="/tv" element={<TvPage />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
