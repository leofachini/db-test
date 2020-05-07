#!/usr/bin/env node

const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const loggerRouter = require('./src/api/components/logger/logger.router');

const expressMiddleware = express();

expressMiddleware.use(cors());
expressMiddleware.use(logger('dev'));
expressMiddleware.use(express.json());
expressMiddleware.use(express.urlencoded({ extended: false }));
expressMiddleware.use(cookieParser());
expressMiddleware.use(express.static(path.join(__dirname, 'public')));

expressMiddleware.use(loggerRouter);

/**
 * Module dependencies.
 */

const debug = require('debug')('debreuck-neirynck:server');
const http = require('http');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3001');
expressMiddleware.set('port', port);

/**
 * Create HTTP server.
 */

const expressServer = http.createServer(expressMiddleware);

/**
 * Listen on provided port, on all network interfaces.
 */

expressServer.listen(port, () => {
  console.log(`Server running on port ${expressMiddleware.get('port')}`);
});
expressServer.on('error', onError);
expressServer.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = expressServer.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
