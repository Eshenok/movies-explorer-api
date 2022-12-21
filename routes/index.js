/* Импорты */
const router = require('express').Router();
const moviesRouter = require('./movies');
const usersRouter = require('./users');
const {
  createUser, signin, logout,
} = require('../controllers/users');
/* Middlewares */
const auth = require('../middlewares/auth');
const { createAccountLimiter } = require('../middlewares/limiter');
const { requestLogger, errorLogger } = require('../middlewares/logger');

/* Роуты */
router.use(requestLogger);

router.post('/signup', createAccountLimiter, createUser);
router.post('/signin', signin);
router.post('/signout', logout);

// Все что ниже защищено auth
router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

/* Ошибки */
router.use(errorLogger);

/* Экспорты */
module.exports = router;
