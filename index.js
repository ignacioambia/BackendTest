const express = require('express');

const app = express();

const port = process.env.port || 3000;

app.get('/test', (request, response) => {
 response.send('Hola mundo!');
});

app.listen(port, () => {
 console.log('Listening to port', port);
});