const { createApp } = require('./src/app.js');

const PORT = 8888;
const app = createApp('public');

app.listen(PORT, () => console.log(`Started listening on ${PORT}`));
