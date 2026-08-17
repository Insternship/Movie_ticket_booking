import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    showId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Show",
      required: true
    },

    customerName: {
      type: String,
      required: true,
      trim: true
    },

    customerEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },

    selectedSeats: {
      type: [String],
      required: true,
      validate: {
        validator: function (seats) {
          return (
            seats.length > 0 &&
            new Set(seats).size === seats.length
          );
        },
        message:
          "Selected seats must be unique and contain at least one seat"
      }
    },

    ticketPriceAtBooking: {
      type: Number,
      required: true
    },

    totalAmount: {
      type: Number,
      required: true
    },

    bookingStatus: {
      type: String,
      enum: ["CONFIRMED", "CANCELLED"],
      default: "CONFIRMED"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Booking", bookingSchema);