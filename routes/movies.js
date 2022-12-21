/* Импорты */
const moviesRouter = require('express').Router();
const {
  getSavedMovies, createMovie, removeSavedMovie,
} = require('../controllers/movies');
const { idValidation, createMovieValidation } = require('../middlewares/validation');

/* Роуты */
moviesRouter.get('/', getSavedMovies);
moviesRouter.post('/', createMovieValidation, createMovie);
moviesRouter.delete('/:id', idValidation, removeSavedMovie);

/* Экспорты */
module.exports = moviesRouter;
