import mongoose from "mongoose";

const seatSchema = new mongoose.Schema(
  {
    seatNumber: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["AVAILABLE", "BOOKED"],
      default: "AVAILABLE"
    }
  },
  { _id: true }
);

const showSchema = new mongoose.Schema(
  {
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true
    },
    theatre: {
      type: String,
      required: true,
      trim: true
    },
    screen: {
      type: String,
      required: true,
      trim: true
    },
    showTime: {
      type: Date,
      required: true
    },
    ticketPrice: {
      type: Number,
      required: true,
      min: 1
    },
    totalSeats: {
      type: Number,
      required: true,
      min: 1
    },
    seats: [seatSchema]
  },
  { timestamps: true }
);

export default mongoose.model("Show", showSchema);