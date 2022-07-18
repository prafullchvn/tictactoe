const { Game } = require('../game.js');

const indexPage = (serveFrom) => (req, res) => {
  const { session } = req;

  if (!session.isPopulated) {
    return res.redirect('/login');
  }
  res.sendFile('index.html', { root: serveFrom });
};

const roomPage = (serveFrom) => (req, res) => {
  const { session } = req;
  if (!session.isPopulated) {
    return res.redirect('/login');
  }
  res.sendFile('room.html', { root: serveFrom });
};

const joinPage = (serveFrom) => (req, res) => {
  const { session } = req;
  if (!session.isPopulated) {
    return res.redirect('/login');
  }
  res.sendFile('join.html', { root: serveFrom });
};

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

const joinGame = (games) => (req, res) => {
  const { session, body: { gameId } } = req;
  const game = games[gameId];

  session.gameId = gameId;
  game.addPlayer(session.user);

  res.redirect('/');
};

module.exports = { indexPage, roomPage, hostGame, joinPage, joinGame };
