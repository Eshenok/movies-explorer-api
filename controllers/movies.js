/* Импорты */
const Movie = require('../models/movie');
/* Ошибки */
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const Forbidden = require('../errors/Forbidden');

module.exports.getSavedMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description,
    image, trailerLink, nameRU, nameEN, thumbnail, movieId,
  } = req.body;

  Movie.create({
    owner: req.user._id,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
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
  Movie.findById(req.params.id)
    .orFail(() => {
      throw new NotFound('Не удалось найти фильм - не передан id');
    })
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        // Проверяем на принадлежность фильма к юзеру
        next(new Forbidden('Нельзя удалить чужой фильм'));
      } else {
        // если выше всё ок -> удаляем эту карточку
        Movie.deleteOne(movie)
          .then(() => res.send(movie));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};
