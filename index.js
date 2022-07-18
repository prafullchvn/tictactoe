const { createApp } = require('./src/app.js');
const { parsed } = require('dotenv').config();

const PORT = 8888;
const config = {
  cookieName: parsed.COOKIE_NAME,
  keys: [parsed.COOKIE_KEY],
  serveFrom: 'public'
};
const app = createApp(config);

app.listen(PORT, () => console.log(`Started listening on ${PORT}`));
