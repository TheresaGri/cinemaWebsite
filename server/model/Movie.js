const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const movieSchema = new Schema({
  title: String,
  genre: Array,
  cast: Array,
  plot: String,
  year: Number,
});

const Movie = model("Movie", movieSchema);

module.exports = Movie;
