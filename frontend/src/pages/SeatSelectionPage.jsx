import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../api/api";
import SeatGrid from "../components/SeatGrid";

function SeatSelectionPage() {
  const { showId } = useParams();
  const navigate = useNavigate();

  const [show, setShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchShow = async () => {
      try {
        setLoading(true);

        const response = await api.get(
          `/shows/${showId}`
        );

        setShow(response.data.data);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load show"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchShow();
  }, [showId]);

  const toggleSeat = (seatNumber) => {
    setSelectedSeats((previous) =>
      previous.includes(seatNumber)
        ? previous.filter(
            (seat) => seat !== seatNumber
          )
        : [...previous, seatNumber]
    );
  };

  const handleBooking = async () => {
    setError("");
    setSuccess("");

    if (!name.trim() || !email.trim()) {
      setError("Name and email are required");
      return;
    }

    if (selectedSeats.length === 0) {
      setError("Please select at least one seat");
      return;
    }

    try {
      setBooking(true);

      const response = await api.post(
        "/bookings",
        {
          showId,
          customerName: name,
          customerEmail: email,
          selectedSeats
        }
      );

      setSuccess(
        `Booking confirmed! Total: ₹${response.data.data.totalAmount}`
      );

      setSelectedSeats([]);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Booking failed. Please try again."
      );
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return <p className="state">Loading seats...</p>;
  }

  if (error && !show) {
    return <p className="error">{error}</p>;
  }

  if (!show) {
    return null;
  }

  const total =
    selectedSeats.length * show.ticketPrice;

  return (
    <div>
      <h1>
        {show.movieId?.title}
      </h1>

      <p>
        Select your seats. Grey seats are already
        booked.
      </p>

      <SeatGrid
        seats={show.seats}
        selectedSeats={selectedSeats}
        onToggle={toggleSeat}
      />

      <div className="booking-summary">
        <h2>Booking Summary</h2>

        <p>
          Selected Seats:{" "}
          {selectedSeats.length
            ? selectedSeats.join(", ")
            : "None"}
        </p>

        <p>
          Price per ticket: ₹{show.ticketPrice}
        </p>

        <h3>Total: ₹{total}</h3>

        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        {error && (
          <p className="error">{error}</p>
        )}

        {success && (
          <p className="success">{success}</p>
        )}

        <button
          className="button"
          onClick={handleBooking}
          disabled={booking}
        >
          {booking
            ? "Confirming..."
            : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
}

export default SeatSelectionPage;