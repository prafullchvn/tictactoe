const { Game } = require('../game.js');

const randomIntBetween = (start, end) => {
  const diff = end - start;
  const ranNum = Math.floor(Math.random() * diff);
  return ranNum + start;
};

const createGameId = () => {
  return Array(5).fill(0).map(() => {
    const ranNum = randomIntBetween(65, 91);
    return String.fromCharCode(ranNum);
  }).join('');
};

const hostGame = (games) => (req, res) => {
  const { session } = req;
  const gameId = createGameId();
  const game = new Game(gameId);

  games[gameId] = game;
  session.gameId = gameId;

  game.addPlayer(session.user);
  res.json({ gameId });
};

const isGameReadyToStart = (games) => (req, res) => {
  const { session } = req;
  const game = games[session.gameId];
  res.json({ isSlotAvailable: game.isSlotAvailable() });
};

const joinGame = (games) => (req, res) => {
  const { session, body: { gameId } } = req;
  const game = games[gameId];

  if (!game) {
    return res.status(400).end();
  }
  if (!game.isSlotAvailable()) {
    return res.status(422).end();
  }

  session.gameId = gameId;
  game.addPlayer(session.user);

  res.redirect('/');
};

const getGameStats = (games) => (req, res) => {
  const { session } = req;
  const game = games[session.gameId];
  if (!game) {
    res.status(500).end();
    return;
  }
  res.json(game.getStats());
};

const registerMove = (games) => (req, res) => {
  const { session: { user, gameId }, body: { cellId } } = req;

  const game = games[gameId];
  if (!game.isCurrentPlayer(user)) {
    res.status(400).end();
    return;
  }
  game.registerMove(+cellId);
  res.end();
};

module.exports = {
  hostGame, joinGame, getGameStats, isGameReadyToStart, registerMove
};
