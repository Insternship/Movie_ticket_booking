import Movie from "../models/Movie.js";

export const createMovie = async (data) => {
  return Movie.create(data);
};

export const getMovies = async () => {
  return Movie.find().sort({ createdAt: -1 });
};

export const getMovieById = async (id) => {
  return Movie.findById(id);
};

export const updateMovie = async (id, data) => {
  return Movie.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
};

export const deleteMovie = async (id) => {
  return Movie.findByIdAndDelete(id);
};