/* Импорты */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Пакет для хэширование пароля
const Unauthorized = require('../errors/Unauthorized');
const { patternEmail } = require('../middlewares/constants');

const userSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
    unique: true,
    match: patternEmail,
  },
  password: {
    required: true,
    type: String,
    select: false,
  },
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
  },
});

/* Кастомные методы */
userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password') // Ищем пользователя по email, т.к. он уникален и через .select забираем пароль
    .then((user) => {
      if (!user) {
        return Promise.reject(new Unauthorized('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password) // Рашифровываем пароль
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Unauthorized('Неправильные почта или пароль')); // Если пароли не совпали, то выдаем ошибку
          }

          return user; // теперь user доступен
        });
    });
};

/* Экспорты */
module.exports = mongoose.model('user', userSchema);
