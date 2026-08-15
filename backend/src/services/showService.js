import Show from "../models/Show.js";

export const createShow = async (data) => {
  return Show.create(data);
};

export const getShows = async () => {
  return Show.find()
    .populate("movieId")
    .sort({ showTime: 1 });
};

export const getShowById = async (id) => {
  return Show.findById(id).populate("movieId");
};

export const updateShow = async (id, data) => {
  return Show.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
};

export const deleteShow = async (id) => {
  return Show.findByIdAndDelete(id);
};