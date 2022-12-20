/* Импорты */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Пакет для создания jwt
const User = require('../models/user');
/* Ошибки */
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFound(req.user._id ? `Пользователя с ${req.user._id} не найдено` : 'Не удалось найти пользователя - не передан id');
    })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.updateCurrentUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFound(req.user._id ? `Пользователя с ${req.user._id} не найдено` : 'Не удалось найти пользователя - не передан id');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

/* Регистрация и Вход */
module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10) // hash пароля
    .then((hash) => User.create({ // если все "ок", то создаем юзера
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      // Изменяем user из JSON в JSObj и удаляем поле пароля
      const userObj = user.toObject();
      delete userObj.password;
      res.send(userObj);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict('Пользователь с такой почтой уже существует'));
      } else if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequest('Переданны некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.signin = (req, res, next) => {
  const { password, email } = req.body;

  User.findUserByCredentials(email, password) // кастомный метод
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'key', { expiresIn: '7d' }); // Создаем токен
      res.cookie('jwt', token, { // Передаем токен юзеру
        maxAge: 3600000 * 24 * 7, // 7 дней срок
        httpOnly: true, // из js закрыли доступ
        sameSite: true, // посылать если запрос сделан с того же домена
      });
      // Изменяем user из JSON в JSObj и удаляем поле пароля
      const userObj = user.toObject();
      delete userObj.password;
      res.send(userObj);
    })
    .catch(next);
};

module.exports.logout = (req, res) => {
  res.cookie('jwt', '', {
    maxAge: 0,
    httpOnly: true,
    sameSite: true,
  });
  res.send({ message: 'Complete' });
};
