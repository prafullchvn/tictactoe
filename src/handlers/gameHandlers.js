const indexPage = (serveFrom) => (req, res) => {
  const { session } = req;
  if (!session) {
    return res.redirect('/login');
  }
  res.sendFile('index.html', { root: serveFrom });
};

module.exports = { indexPage };
