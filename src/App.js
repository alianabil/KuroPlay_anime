import "./App.css";
import Popular from "./Components/popular/popular";
import Homepage from "./Components/Homepage/Homepage";
import AnimeItem from "./Components/AnimeItem/AnimeItem";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Gallery from "./Components/Gallery/Gallery";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/anime/:id" element={<AnimeItem />} />
        <Route path="/character/:id" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
