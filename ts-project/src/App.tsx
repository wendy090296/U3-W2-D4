import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ArticleSection from "./components/ArticleSection";
import "bootstrap/dist/css/bootstrap.min.css";
import DetailsComponent from "./components/DetailsComponent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ArticleSection />} path="/" />
        <Route element={<DetailsComponent />} path="/:details" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
