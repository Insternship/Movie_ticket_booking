import express from "express";

import {
  createBooking,
  getBookings,
  getBooking,
  cancelBooking
} from "../controllers/bookingController.js";

import {
  validateBooking,
  validateObjectId
} from "../middleware/validate.js";

const router = express.Router();

router
  .post("/", validateBooking, createBooking)
  .get("/", getBookings);

router.get(
  "/:id",
  validateObjectId("id"),
  getBooking
);

router.patch(
  "/:id/cancel",
  validateObjectId("id"),
  cancelBooking
);

export default router;