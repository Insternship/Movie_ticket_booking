import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ShowsPage from "./pages/ShowsPage";
import SeatSelectionPage from "./pages/SeatSelectionPage";

function App() {
  return (
    <>
      <Navbar />

      <main className="container">
        <Routes>
          <Route path="/" element={<ShowsPage />} />
          <Route
            path="/shows/:showId/book"
            element={<SeatSelectionPage />}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;