
const express = require('express');
const path = require('path');
const clientPort = 8080;
const client = express();

// serve static assets normally
client.use(express.static(path.resolve(__dirname, 'distribution')));

// handle every other route with index.html, which will contain
// a script tag to your clientlication's JavaScript file(s).
client.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'distribution', 'index.html'));
});

client.listen(clientPort);
console.log(`server started on clientPort ${clientPort}`);
