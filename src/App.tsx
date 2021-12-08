import { BrowserRouter, Routes, Route } from "react-router-dom";
import Photos from "./pages/photos";
import Posts from "./pages/posts";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/photos" element={<Photos />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/" element={<Posts />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
