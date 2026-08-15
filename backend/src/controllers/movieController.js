import * as movieService from "../services/movieService.js";

export const createMovie = async (req, res) => {
  const movie = await movieService.createMovie(req.body);

  res.status(201).json({
    success: true,
    data: movie
  });
};

export const getMovies = async (req, res) => {
  const movies = await movieService.getMovies();

  res.json({
    success: true,
    data: movies
  });
};

export const getMovie = async (req, res) => {
  const movie = await movieService.getMovieById(req.params.id);

  if (!movie) {
    return res.status(404).json({
      success: false,
      message: "Movie not found"
    });
  }

  res.json({
    success: true,
    data: movie
  });
};

export const updateMovie = async (req, res) => {
  const movie = await movieService.updateMovie(req.params.id, req.body);

  if (!movie) {
    return res.status(404).json({
      success: false,
      message: "Movie not found"
    });
  }

  res.json({
    success: true,
    data: movie
  });
};

export const deleteMovie = async (req, res) => {
  const movie = await movieService.deleteMovie(req.params.id);

  if (!movie) {
    return res.status(404).json({
      success: false,
      message: "Movie not found"
    });
  }

  res.json({
    success: true,
    message: "Movie deleted successfully"
  });
};