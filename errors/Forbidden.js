class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.message = 'Доступ запрещен';
    this.statusCode = 403;
  }
}

module.exports = Forbidden;
