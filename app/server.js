const express = require('express');
const serveIndex = require('serve-index');
const api = require('./api.js');

const app = express();
const port = 8000;

app.use('/api', api);

app.use(express.static('.'));
app.use(serveIndex('.', { icons: true }));

app.listen(port, function() {
	console.log('HTTP server started on port ' + port);
});
