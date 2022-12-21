/* Импорты */
const Movie = require('../models/movie');
/* Ошибки */
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');

module.exports.getSavedMovies = (req, res, next) => {
  const userId = 1;
  Movie.find({ owner: userId })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description,
    image, trailer, nameRU, nameEN, thumbnail, movieId,
  } = req.body;

  Movie.create({
    owner: req.user._id,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequest('Переданны некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.removeSavedMovie = (req, res, next) => {
  Movie.findByIdAndRemove(req.params._id)
    .orFail(() => {
      throw new NotFound(req.user._id ? `Фильм с ${req.params._id} не найдено` : 'Не удалось найти фильм - не передан id');
    })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные'))
      } else {
        next(err);
      }
    });
};
