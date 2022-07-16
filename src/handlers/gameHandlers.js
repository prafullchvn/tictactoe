const { Game } = require('../game.js');

const indexPage = (serveFrom) => (req, res) => {
  const { session } = req;
  if (!session) {
    return res.redirect('/login');
  }
  res.sendFile('index.html', { root: serveFrom });
};

const startGamePage = (serveFrom) => (req, res) => {
  const { session } = req;
  if (!session) {
    return res.redirect('/login');
  }
  res.sendFile('start-game.html', { root: serveFrom });
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
  session.user.gameId = gameId;

  game.addPlayer(session.user.username);
  res.json({ gameId });
};

module.exports = { indexPage, startGamePage, hostGame };
