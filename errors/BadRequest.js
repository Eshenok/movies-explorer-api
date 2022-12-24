class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.message = 'Переданы некорректные данные';
    this.statusCode = 400;
  }
}

module.exports = BadRequest;
