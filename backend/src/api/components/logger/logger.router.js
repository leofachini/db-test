const express = require('express');
const router = express.Router();
const LoggerController = require('./logger.controller');

router.post('/log', LoggerController.processLogFile);

module.exports = router;
