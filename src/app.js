const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const authLib = require('./handlers/authHandlers.js');
const staticPagesLib = require('./handlers/staticPageHandlers');
const gameHandlersLib = require('./handlers/gameHandlers.js');
const { loginPage, loginHandler, logout } = authLib;
const { indexPage, roomPage, joinPage } = staticPagesLib;
const { hostGame, joinGame, getGameStats } = gameHandlersLib;
const { isGameReadyToStart, registerMove } = gameHandlersLib;

const createApp = (config, games = {}) => {
  const { cookieName, keys, serveFrom } = config;
  const app = express();

  app.use(morgan('tiny'));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(cookieSession({ name: cookieName, keys }));

  app.get('/login', loginPage(serveFrom));
  app.post('/login', loginHandler);
  app.get('/logout', logout);

  app.get('/room', roomPage(serveFrom));
  app.get('/host', hostGame(games));
  app.get('/is-game-ready', isGameReadyToStart(games));
  app.get('/join', joinPage(serveFrom));
  app.post('/join', joinGame(games));

  app.get('/', indexPage(serveFrom));
  app.get('/get-stats', getGameStats(games));
  app.post('/register-move', registerMove(games));

  app.use(express.static(serveFrom));

  return app;
};

module.exports = { createApp };
