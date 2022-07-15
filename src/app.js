const express = require('express');

const createApp = (serveFrom) => {
  const app = express();
  app.use(express.static(serveFrom));

  return app;
};

module.exports = { createApp };
