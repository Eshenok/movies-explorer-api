/* Импорты */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
    unique: true,
    // match: patternEmail,
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

/* Экспорты */
module.exports = mongoose.model('user', userSchema);
