'use strict';

let path = require('path');
//multi enviro support. Minimum is a .env file. See readme
require('dotenv').config({
  silent: true
});

//Server Variables
let http = require('http');
let port = process.env.PORT || 8888;
let cors = require('cors');
let express = require('express');
let bodyParser = require('body-parser');
let app = express();

let constants = require('./server/common/constants');

let CommonError = require('./server/common/commonErrors');

app.use(cors());

app.options('*', cors());//enable preflight checks

app.use(bodyParser.urlencoded({
  'extended': 'true'
}));

app.use(bodyParser.json({limit: '50mb'}));

// loading routes
app.use('', require('./server/routes/index'));

//static route for the docs
if (process.env.NODE_ENV === 'development') {
  app.use('/docs', express.static(__dirname + '/docs'));
}

//Error Handler Middleware
app.use(require('./server/middleware/errorHandler.middleware'));

// setup the web server
app.server = http.Server(app);

app.server.listen(port, function() {
  console.info('Server is running on port ' + port);
});

process.on('uncaughtException', function(err) {
  console.error('err : ' + err);
});

exports.close = function(callback) {
  app.server.close(callback);
};

exports.instance = app.server;
