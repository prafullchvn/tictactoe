const loginPage = (serveFrom) => (req, res) => {
  const { session } = req;
  if (session.isPopulated) {
    return res.redirect('/');
  }
  res.sendFile('login.html', { root: serveFrom });
};

const loginHandler = (req, res) => {
  const { body, session } = req;

  if (!body.name) {
    res.status(400).end('Provide your name');
    return;
  }
  session.user = body.name;
  res.cookie('sessionId', new Date().getTime()).redirect('/room');
};

module.exports = { loginPage, loginHandler };
