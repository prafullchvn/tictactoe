const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const { loginPage, loginHandler, logout } = require('./handlers/authHandlers.js');
const { indexPage, roomPage, hostGame, joinPage, joinGame } = require('./handlers/gameHandlers.js');

const createApp = (serveFrom, games = {}) => {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('tiny'));
  app.use(cookieParser());
  app.use(cookieSession({ name: 'sessionId', keys: ['tic-tac-toe'] }));

  app.get('/', indexPage(serveFrom));
  app.get('/login', loginPage(serveFrom));
  app.get('/room', roomPage(serveFrom));
  app.get('/host', hostGame(games));
  app.get('/join', joinPage(serveFrom));
  app.get('/logout', logout);

  app.post('/login', loginHandler);
  app.post('/join', joinGame(games));

  app.use(express.static(serveFrom));

  return app;
};

module.exports = { createApp };
