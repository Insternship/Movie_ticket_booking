function SeatGrid({
  seats,
  selectedSeats,
  onToggle
}) {
  return (
    <div className="seat-grid">
      {seats.map((seat) => {
        const isSelected = selectedSeats.includes(
          seat.seatNumber
        );

        const isBooked =
          seat.status === "BOOKED";

        return (
          <button
            key={seat._id}
            disabled={isBooked}
            className={`seat ${
              isBooked ? "booked" : ""
            } ${isSelected ? "selected" : ""}`}
            onClick={() =>
              onToggle(seat.seatNumber)
            }
          >
            {seat.seatNumber}
          </button>
        );
      })}
    </div>
  );
}

export default SeatGrid;