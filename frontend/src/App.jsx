import { BrowserRouter, Routes, Route } from "react-router-dom";
import BrowsePage from "./pages/BrowsePage";
import DealPage from "./pages/DealPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BrowsePage />} />
        <Route path="/deals/:id" element={<DealPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;