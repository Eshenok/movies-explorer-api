const options = {
  origin: [
    'http://localhost:3000',
    'https://movies-explorer.eshenok.nomoredomains.club',
    'http://movies-explorer.eshenok.nomoredomains.club',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

module.exports = options;
