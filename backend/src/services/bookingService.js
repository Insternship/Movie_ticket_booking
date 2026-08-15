import mongoose from "mongoose";
import Show from "../models/Show.js";
import Booking from "../models/Booking.js";

export const createBooking = async ({
  showId,
  customerName,
  customerEmail,
  selectedSeats
}) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const uniqueSeats = [...new Set(selectedSeats)];

    if (uniqueSeats.length !== selectedSeats.length) {
      throw new Error("Duplicate seat selected");
    }

    const show = await Show.findById(showId).session(session);

    if (!show) {
      throw new Error("Show not found");
    }

    // Check every requested seat exists and is available.
    const availableSeatCount = show.seats.filter(
      (seat) =>
        uniqueSeats.includes(seat.seatNumber) &&
        seat.status === "AVAILABLE"
    ).length;

    if (availableSeatCount !== uniqueSeats.length) {
      throw new Error(
        "One or more seats are no longer available. Please select again."
      );
    }

    // Atomic conditional update:
    // The update succeeds only if all requested seats are still AVAILABLE.
    const updateResult = await Show.updateOne(
      {
        _id: showId,
        seats: {
          $not: {
            $elemMatch: {
              seatNumber: { $in: uniqueSeats },
              status: "BOOKED"
            }
          }
        }
      },
      {
        $set: {
          "seats.$[seat].status": "BOOKED"
        }
      },
      {
        arrayFilters: [
          {
            "seat.seatNumber": { $in: uniqueSeats },
            "seat.status": "AVAILABLE"
          }
        ],
        session
      }
    );

    if (updateResult.modifiedCount !== 1) {
      throw new Error(
        "Seats were just booked by another user. Please select different seats."
      );
    }

    // Snapshot price at booking time.
    const ticketPriceAtBooking = show.ticketPrice;

    const totalAmount =
      ticketPriceAtBooking * uniqueSeats.length;

    const booking = await Booking.create(
      [
        {
          showId,
          customerName,
          customerEmail,
          selectedSeats: uniqueSeats,
          ticketPriceAtBooking,
          totalAmount,
          bookingStatus: "CONFIRMED"
        }
      ],
      { session }
    );

    await session.commitTransaction();

    return booking[0];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const getBookings = async () => {
  return Booking.find()
    .populate({
      path: "showId",
      populate: {
        path: "movieId"
      }
    })
    .sort({ createdAt: -1 });
};

export const getBookingById = async (id) => {
  return Booking.findById(id);
};

export const cancelBooking = async (bookingId) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const booking = await Booking.findById(bookingId).session(session);

    if (!booking) {
      throw new Error("Booking not found");
    }

    if (booking.bookingStatus === "CANCELLED") {
      throw new Error("Booking is already cancelled");
    }

    await Show.updateOne(
      { _id: booking.showId },
      {
        $set: {
          "seats.$[seat].status": "AVAILABLE"
        }
      },
      {
        arrayFilters: [
          {
            "seat.seatNumber": {
              $in: booking.selectedSeats
            }
          }
        ],
        session
      }
    );

    booking.bookingStatus = "CANCELLED";
    await booking.save({ session });

    await session.commitTransaction();

    return booking;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};