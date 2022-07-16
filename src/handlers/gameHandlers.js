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

module.exports = { indexPage, startGamePage };
