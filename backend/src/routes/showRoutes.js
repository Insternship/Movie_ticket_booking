import express from "express";

import {
  createShow,
  getShows,
  getShow,
  updateShow,
  deleteShow
} from "../controllers/showController.js";

import {
  validateShow,
  validateObjectId
} from "../middleware/validate.js";

const router = express.Router();

router
  .route("/")
  .post(validateShow, createShow)
  .get(getShows);

router
  .route("/:id")
  .get(validateObjectId("id"), getShow)
  .put(validateObjectId("id"), validateShow, updateShow)
  .delete(validateObjectId("id"), deleteShow);

export default router;