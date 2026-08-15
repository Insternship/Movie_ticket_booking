import { useEffect, useState } from "react";
import api from "../api/api";
import ShowCard from "../components/ShowCard";

function ShowsPage() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchShows = async () => {
      try {
        setLoading(true);

        const response = await api.get("/shows");

        setShows(response.data.data);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load shows"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, []);

  if (loading) {
    return <p className="state">Loading shows...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (shows.length === 0) {
    return (
      <div className="state">
        <h2>No shows available</h2>
        <p>Please add a movie show from the backend.</p>
      </div>
    );
  }

  return (
    <>
      <h1>Available Shows</h1>

      <div className="shows-grid">
        {shows.map((show) => (
          <ShowCard
            key={show._id}
            show={show}
          />
        ))}
      </div>
    </>
  );
}

export default ShowsPage;