/* Импорты */
const router = require('express').Router();
const { errors } = require('celebrate');
const moviesRouter = require('./movies');
const usersRouter = require('./users');
const {
  createUser, signin, signout,
} = require('../controllers/users');
/* Ошибки */
const NotFound = require('../errors/NotFound');
/* Middlewares */
const auth = require('../middlewares/auth');
const { createAccountLimiter } = require('../middlewares/limiter');
const { requestLogger, errorLogger } = require('../middlewares/logger');
const { signupValidation, signinValidation } = require('../middlewares/validation');

/* Роуты */
router.use(requestLogger);

/*
* createAccountLimiter
* Ограничил количесвто запросов на создание пользователя
* Оно отлично от общего количества запросов с 1 IP
*/
router.post('/signup', createAccountLimiter, signupValidation, createUser);
router.post('/signin', signinValidation, signin);

// Все что ниже защищено auth
router.use(auth);

/*
 По факту для signout не важно где прописать
 Все равно будет передана "Мертвая" кука.
 Если прописать до auth, то приложение будет быстрее,
 Но ради соответствия заданию прописал ее ниже.
 */
router.post('/signout', signout);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

/* Ошибки */
router.use(errors({
  message: 'Введены некорректные данные',
}));

router.use((req, res, next) => {
  next(new NotFound('Такой страницы не существует'));
});

router.use(errorLogger);

/* Экспорты */
module.exports = router;
