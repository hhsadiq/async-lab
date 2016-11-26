// multi enviro support. Minimum is a .env file. See readme
require('dotenv').config({
  silent: true,
});

//Server Variables
const http = require('http');
const port = process.env.PORT || 8888;
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const constants = require('./server/common/constants');


app.use(cors());

// enable preflight checks
app.options('*', cors());

app.use(bodyParser.urlencoded({
  extended: 'true',
}));

app.use(bodyParser.json({ limit: '50mb' }));

// loading routes
app.use('', require('./server/routes/index'));

// static route for the docs
if (process.env.NODE_ENV === 'development') {
  app.use('/docs', express.static(__dirname + '/docs'));
}

//Error Handler Middleware
app.use(require('./server/middleware/errorHandler.middleware'));

// setup the web server
app.server = http.Server(app);

app.server.listen(port, () => (
  console.info(`Server is running on port ${port}`)
));

process.on('uncaughtException', err => console.error(`err : + ${err}`));

exports.close = callback => app.server.close(callback);

exports.instance = app.server;
