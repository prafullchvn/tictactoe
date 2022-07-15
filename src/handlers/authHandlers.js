const loginPage = (serveFrom) => (req, res) => {
  const { session } = req;
  if (session) {
    return res.redirect('/');
  }
  res.sendFile('login.html', { root: serveFrom });
};

// const loginHandler = (sessions) => (req, res) => {

// };

module.exports = { loginPage };
