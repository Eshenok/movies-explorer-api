class Conflict extends Error {
  constructor(message) {
    super(message);
    this.message = 'Пользователь с такой почтой уже существует';
    this.statusCode = 409;
  }
}

module.exports = Conflict;
