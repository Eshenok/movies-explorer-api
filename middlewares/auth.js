/* Импорты */
const jwt = require('jsonwebtoken'); // Пакет для создания jwt
/* Ошибка */
const Unauthorized = require('../errors/Unauthorized');
/* env */
const { NODE_ENV, JWT_SECRET } = process.env;
const { devSecurityKey } = require('../middlewares/constants');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt; // Достаем токен (с помощью cookieParser он доступен)
  if (!token) {
    next(new Unauthorized('Необходимо авторизоваться')); // Если не нашли токен в куках передаем ошибку
    return;
  }

  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : devSecurityKey); // верифицируем токен
  } catch (err) {
    next(new Unauthorized('Необходимо авторизоваться')); // не получилось -> ошибка
    return;
  }

  req.user = payload; // записываем пейлод в юзера
  next(); // пропускаем дальше
};
