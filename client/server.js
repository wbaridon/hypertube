const express = require('express');
const expressStaticGzip = require('express-static-gzip');
const path = require('path');

const app = express();

// Serve the static files from the React app
app.use(expressStaticGzip(path.join(__dirname, '/distribution/')));

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/distribution/'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`App is listening on port '${port}'`);
