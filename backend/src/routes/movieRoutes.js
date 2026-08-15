import express from "express";

import {
  createMovie,
  getMovies,
  getMovie,
  updateMovie,
  deleteMovie
} from "../controllers/movieController.js";

import {
  validateMovie,
  validateObjectId
} from "../middleware/validate.js";

const router = express.Router();

router
  .route("/")
  .post(validateMovie, createMovie)
  .get(getMovies);

router
  .route("/:id")
  .get(validateObjectId("id"), getMovie)
  .put(validateObjectId("id"), validateMovie, updateMovie)
  .delete(validateObjectId("id"), deleteMovie);

export default router;