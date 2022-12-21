/* Импорты */
const moviesRouter = require('express').Router();
const {
  getSavedMovies, createMovie, removeSavedMovie,
} = require('../controllers/movies');

/* Роуты */
moviesRouter.get('/', getSavedMovies);
moviesRouter.post('/', createMovie);
moviesRouter.delete('/:_id', removeSavedMovie);

/* Экспорты */
module.exports = moviesRouter;
