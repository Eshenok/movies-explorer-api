/* Импорты */
const rateLimit = require('express-rate-limit'); // Пакет лимитера запросов

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

const createAccountLimiter = rateLimit({ // лимит на создание пользователей
  windowMs: 30 * 60 * 1000, // 30 минут
  max: 10, // максимум 10, если не в продакшене то ограничение в 9999
  message:
    'Too many request',
  standardHeaders: true, // Стандартные заголовки
  legacyHeaders: false, // Легаси заголовки
});

/* Эскпорты */
module.exports = { limiter, createAccountLimiter };
