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

module.exports = { indexPage, roomPage, joinPage };
