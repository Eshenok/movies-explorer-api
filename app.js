/* Импорты */
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet'); // пакет helmet (security)
const cookieParser = require('cookie-parser');
const { limiter } = require('./middlewares/limiter');
const { replaceMnemonics } = require('./middlewares/replaceMnemonics');

const { PORT = 2020, CONNECT_DB, NODE_ENV } = process.env; // Забираем из .env

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Подключение к DB */
mongoose.connect(NODE_ENV === 'production' ? CONNECT_DB : 'mongodb://localhost:27017/moviedb');

/* Security */
app.use(limiter);
app.use(helmet());

/* Cookie */
app.use(cookieParser());

/* Подастановка мнемоник escapeHTML */
app.use(replaceMnemonics);

/* Роуты */
app.use('/', require('./routes/index'));

/* Центральный обработчик ошибок */
app.use(require('./errors/centralErrorHandling'));

app.listen(PORT);
