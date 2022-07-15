const express = require('express');
const { fileLogger } = require('./middleware/fileLogger.js');
const { injectCookies } = require('./middleware/injectCookies.js');
const { injectSession } = require('./middleware/injectSession.js');

const createApp = (serveFrom) => {
  const app = express();
  app.use(fileLogger);
  app.use(injectCookies);
  app.use(injectSession);

  app.use(express.static(serveFrom));

  return app;
};

module.exports = { createApp };
