import * as bookingService from "../services/bookingService.js";

export const createBooking = async (req, res) => {
  try {
    const booking = await bookingService.createBooking(req.body);

    res.status(201).json({
      success: true,
      message: "Booking confirmed successfully",
      data: booking
    });
  } catch (error) {
    res.status(409).json({
      success: false,
      message: error.message
    });
  }
};

export const getBookings = async (req, res) => {
  const bookings = await bookingService.getBookings();

  res.json({
    success: true,
    data: bookings
  });
};

export const getBooking = async (req, res) => {
  const booking = await bookingService.getBookingById(req.params.id);

  if (!booking) {
    return res.status(404).json({
      success: false,
      message: "Booking not found"
    });
  }

  res.json({
    success: true,
    data: booking
  });
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await bookingService.cancelBooking(req.params.id);

    res.json({
      success: true,
      message: "Booking cancelled successfully",
      data: booking
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};