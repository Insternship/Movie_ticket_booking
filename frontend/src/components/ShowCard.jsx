import { Link } from "react-router-dom";

function ShowCard({ show }) {
  const availableSeats = show.seats.filter(
    (seat) => seat.status === "AVAILABLE"
  ).length;

  return (
    <div className="show-card">
      <h2>{show.movieId?.title}</h2>

      <p>
        <strong>Theatre:</strong> {show.theatre}
      </p>

      <p>
        <strong>Screen:</strong> {show.screen}
      </p>

      <p>
        <strong>Showtime:</strong>{" "}
        {new Date(show.showTime).toLocaleString()}
      </p>

      <p>
        <strong>Available Seats:</strong> {availableSeats}
      </p>

      <p>
        <strong>Price:</strong> ₹{show.ticketPrice}
      </p>

      <Link
        className="button"
        to={`/shows/${show._id}/book`}
      >
        Book Seats
      </Link>
    </div>
  );
}

export default ShowCard;