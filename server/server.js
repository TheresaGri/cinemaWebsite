const mongoose = require("mongoose");
const express = require("express");
const app = express();
const { $and } = require("mongoose").mongo;
const PORT = 3000;

app.use(express.json());
let Movie = require("./model/Movie.js");
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

mongoose.connect(
  "mongodb+srv://theresagri:XcsNUtaP9GJdX3i@cluster0.jycu5sj.mongodb.net/sample_mflix"
);

async function insertNewMovie() {
  try {
    const db = mongoose.connection;
    const movieCollection = db.collection("movies");
    const newMovie = await movieCollection.insertOne({
      title: "Everything everywhere all at once",
      genre: ["fiction"],
      cast: ["Michelle Yeoh", "Jamie Lee Curtis"],
      plot: "It follows Evelyn Wang, a Chinese-American immigrant who, while being audited by the IRS, must connect with parallel universe versions of herself to prevent a powerful being from destroying the multiverse.",
      year: 2022,
    });
    console.log(newMovie);
  } catch (error) {
    console.error(error);
  }
}

async function findMoviesByYear(year) {
  try {
    const movie = await Movie.find({ year: year });
    console.log(movie);
  } catch (error) {
    console.error(error);
  }
}

async function findMoviesByGenre() {}

/* insertNewMovie();
 */
/* findMoviesByYear(2022);
 */
async function findMovieByMovieSpan(year) {
  try {
    const movies = await Movie.find({ year: { $gt: year } });
    console.log(movies);
  } catch (error) {
    console.error(error);
  }
}

/* findMovieByMovieSpan(2010);
 */

async function findMovieByTitleAndUpdateTitle(titleOfMovie, changedTitle) {
  try {
    const movie = await Movie.findOne({ title: titleOfMovie });
    movie.title = changedTitle;
    const updatedMovie = await movie.save();
    console.log(updatedMovie);
  } catch (error) {
    console.error(error);
  }
}

/* findMovieByTitleAndUpdateTitle("All quiet on the western front", "Im Westen nichts Neues");
 */

async function deleteMovie(title) {
  try {
    const deletedMovie = await Movie.deleteOne({ title: title });
    console.log(deletedMovie);
  } catch (error) {
    console.error(error);
  }
}
/* deleteMovie("Everything everywhere all at once"); */

async function findMoviesWithIMDbandGenre(imdbRating, genreOfMovies) {
  const movies = await Movie.find({
    $and: [
      { "imdb.rating": { $gte: imdbRating } },
      { genres: { $in: genreOfMovies } },
    ],
  });
  console.log(movies);
}

/* findMoviesWithIMDbandGenre(8.5, ["Fantasy"]);
 */