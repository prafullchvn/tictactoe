const express = require('express');
const { fileLogger } = require('./middleware/fileLogger.js');
const { injectCookies } = require('./middleware/injectCookies.js');
const { injectSession } = require('./middleware/injectSession.js');
const { loginPage, loginHandler } = require('./handlers/authHandlers.js');
const { indexPage, startGamePage } = require('./handlers/gameHandlers.js');

const createApp = (serveFrom, sessions = {}) => {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(fileLogger);
  app.use(injectCookies);
  app.use(injectSession(sessions));

  app.get('/', indexPage(serveFrom));
  app.get('/login', loginPage(serveFrom));
  app.get('/start-game', startGamePage(serveFrom));

  app.post('/login', loginHandler(sessions));

  app.use(express.static(serveFrom));

  return app;
};

module.exports = { createApp };
