import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Movie title is required"],
      trim: true,
      minlength: 2,
      maxlength: 100
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: 500
    },
    duration: {
      type: Number,
      required: true,
      min: [1, "Duration must be greater than 0"]
    },
    language: {
      type: String,
      required: true,
      trim: true
    },
    posterUrl: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

export default mongoose.model("Movie", movieSchema);