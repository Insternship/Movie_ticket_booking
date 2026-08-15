import mongoose from "mongoose";

export const validateObjectId = (paramName) => {
  return (req, res, next) => {
    const id = req.params[paramName];

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: `Invalid ${paramName}`
      });
    }

    next();
  };
};

export const validateMovie = (req, res, next) => {
  const { title, description, duration, language, posterUrl } = req.body;

  if (!title || typeof title !== "string" || title.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: "Title is required and must contain at least 2 characters"
    });
  }

  if (
    !description ||
    typeof description !== "string" ||
    description.trim().length < 5
  ) {
    return res.status(400).json({
      success: false,
      message: "Description is required and must contain at least 5 characters"
    });
  }

  if (
    duration === undefined ||
    typeof duration !== "number" ||
    duration <= 0
  ) {
    return res.status(400).json({
      success: false,
      message: "Duration must be a number greater than 0"
    });
  }

  if (!language || typeof language !== "string") {
    return res.status(400).json({
      success: false,
      message: "Language is required"
    });
  }

  if (posterUrl !== undefined && typeof posterUrl !== "string") {
    return res.status(400).json({
      success: false,
      message: "posterUrl must be a string"
    });
  }

  next();
};

export const validateShow = (req, res, next) => {
  const {
    movieId,
    theatre,
    screen,
    showTime,
    ticketPrice,
    totalSeats,
    seats
  } = req.body;

  if (!movieId || !mongoose.Types.ObjectId.isValid(movieId)) {
    return res.status(400).json({
      success: false,
      message: "Valid movieId is required"
    });
  }

  if (!theatre || typeof theatre !== "string") {
    return res.status(400).json({
      success: false,
      message: "Theatre is required"
    });
  }

  if (!screen || typeof screen !== "string") {
    return res.status(400).json({
      success: false,
      message: "Screen is required"
    });
  }

  if (!showTime || Number.isNaN(Date.parse(showTime))) {
    return res.status(400).json({
      success: false,
      message: "Valid showTime is required"
    });
  }

  if (
    typeof ticketPrice !== "number" ||
    ticketPrice <= 0
  ) {
    return res.status(400).json({
      success: false,
      message: "ticketPrice must be greater than 0"
    });
  }

  if (
    typeof totalSeats !== "number" ||
    totalSeats <= 0 ||
    !Number.isInteger(totalSeats)
  ) {
    return res.status(400).json({
      success: false,
      message: "totalSeats must be a positive integer"
    });
  }

  if (!Array.isArray(seats) || seats.length !== totalSeats) {
    return res.status(400).json({
      success: false,
      message: "seats must be an array matching totalSeats"
    });
  }

  const seatNumbers = seats.map((seat) => seat.seatNumber);

  if (
    seatNumbers.some(
      (seatNumber) =>
        !seatNumber ||
        typeof seatNumber !== "string"
    )
  ) {
    return res.status(400).json({
      success: false,
      message: "Every seat must have a valid seatNumber"
    });
  }

  if (new Set(seatNumbers).size !== seatNumbers.length) {
    return res.status(400).json({
      success: false,
      message: "Duplicate seat numbers are not allowed"
    });
  }

  next();
};

export const validateBooking = (req, res, next) => {
  const {
    showId,
    customerName,
    customerEmail,
    selectedSeats
  } = req.body;

  if (!showId || !mongoose.Types.ObjectId.isValid(showId)) {
    return res.status(400).json({
      success: false,
      message: "Valid showId is required"
    });
  }

  if (
    !customerName ||
    typeof customerName !== "string" ||
    customerName.trim().length < 2
  ) {
    return res.status(400).json({
      success: false,
      message: "Customer name must contain at least 2 characters"
    });
  }

  if (
    !customerEmail ||
    typeof customerEmail !== "string"
  ) {
    return res.status(400).json({
      success: false,
      message: "Customer email is required"
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(customerEmail)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email address"
    });
  }

  if (
    !Array.isArray(selectedSeats) ||
    selectedSeats.length === 0
  ) {
    return res.status(400).json({
      success: false,
      message: "At least one seat must be selected"
    });
  }

  if (
    selectedSeats.some(
      (seat) =>
        typeof seat !== "string" ||
        seat.trim() === ""
    )
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid seat number"
    });
  }

  if (
    new Set(selectedSeats).size !== selectedSeats.length
  ) {
    return res.status(400).json({
      success: false,
      message: "Duplicate seats are not allowed"
    });
  }

  next();
};