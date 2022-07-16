const loginPage = (serveFrom) => (req, res) => {
  const { session } = req;
  if (session) {
    return res.redirect('/');
  }
  res.sendFile('login.html', { root: serveFrom });
};

const createSession = (username) => {
  const time = new Date();
  return { user: { username }, time, sessionId: time.getTime() };
};

const loginHandler = (sessions) => (req, res) => {
  const { body } = req;
  if (!body.name) {
    res.status(400).end('Provide your name');
    return;
  }

  const session = createSession(body.name);
  sessions[session.sessionId] = session;
  res.cookie('sessionId', session.sessionId).redirect('/start-game');
};

module.exports = { loginPage, loginHandler };
