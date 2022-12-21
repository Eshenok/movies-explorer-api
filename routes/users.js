/* Испорты */
const usersRouter = require('express').Router();
const {
  getCurrentUser, updateCurrentUser,
} = require('../controllers/users');
const { updateUserValidation } = require('../middlewares/validation');

/* Роуты */
usersRouter.get('/me', getCurrentUser);
usersRouter.patch('/me', updateUserValidation, updateCurrentUser);

/* Экспорты */
module.exports = usersRouter;
