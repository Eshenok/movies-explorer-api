/* Импорты */
const mongoose = require('mongoose');
const { patternUrl } = require('../middlewares/constants');

const movieSchema = new mongoose.Schema({
  country: {
    required: true,
    type: String,
  },
  director: {
    required: true,
    type: String,
  },
  duration: {
    required: true,
    type: Number,
  },
  year: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  image: {
    required: true,
    type: String,
    match: patternUrl,
  },
  trailerLink: {
    required: true,
    type: String,
    match: patternUrl,
  },
  thumbnail: {
    required: true,
    type: String,
    match: patternUrl,
  },
  // _id пользователя, который сохранил фильм.
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  // id фильма, который содержится в ответе сервиса MoviesExplorer.
  movieId: {
    required: true,
    type: String,
    unique: true,
  },
  nameRU: {
    required: true,
    type: String,
  },
  nameEN: {
    required: true,
    type: String,
  },
});

/* Экпорты */
module.exports = mongoose.model('movie', movieSchema);
