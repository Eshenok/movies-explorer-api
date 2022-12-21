/* Испорты */
const usersRouter = require('express').Router();
const {
  getCurrentUser, updateCurrentUser,
} = require('../controllers/users');

/* Роуты */
usersRouter.get('/me', getCurrentUser);
usersRouter.patch('/me', updateCurrentUser);

/* Экспорты */
module.exports = usersRouter;
