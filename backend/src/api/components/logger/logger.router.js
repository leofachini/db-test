const express = require('express');
const cors = require('cors');
const router = express.Router();
const LoggerController = require('./logger.controller');

const whitelist = ['http://localhost:3000'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

router.post('/log', cors(corsOptions), LoggerController.processLogFile);

module.exports = router;
