/* Импорты */
const router = require('express').Router();
const { errors } = require('celebrate');
const moviesRouter = require('./movies');
const usersRouter = require('./users');
const {
  createUser, signin, signout,
} = require('../controllers/users');
/* Middlewares */
const auth = require('../middlewares/auth');
const { createAccountLimiter } = require('../middlewares/limiter');
const { requestLogger, errorLogger } = require('../middlewares/logger');
const { signupValidation, signinValidation } = require('../middlewares/validation');

/* Роуты */
router.use(requestLogger);

router.post('/signup', createAccountLimiter, signupValidation, createUser);
router.post('/signin', signinValidation, signin);
router.post('/signout', signout);

// Все что ниже защищено auth
router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

/* Ошибки */
router.use(errors({
  message: 'Введены некорректные данные',
}));

router.use(errorLogger);

/* Экспорты */
module.exports = router;
